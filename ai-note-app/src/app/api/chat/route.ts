import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    // history of only 6 messages because if we change topics 
    // mid chat the vector embedding will look for everything that is in the 
    // messages and that doesnt work very well
    // Below is chat history to only read the last 6 total messages from user to AI as well
    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbedding(
        messagesTruncated.map((message) => message.content).join("\n")
    )
// We take the chat history, make it one string that is seperated with line breaks and then send this off 
// for vector embedding 

    const {userId} = auth();

    const vectorQueryResponse = await notesIndex.query({
        vector: embedding,
        topK: 15,   //this is how many notes it is trying to find, higher values result in higher token count, in smartdiary app that tut refers to he uses 30 in that
        filter: {userId}
    })

    const relevantNotes = await prisma.note.findMany({
        where: {
            id: {
                in: vectorQueryResponse.matches.map((match) => match.id)
            }
        }
    })

    console.log("relevant notes found: ", relevantNotes);

    const systemMessage: ChatCompletionMessage = {
        role: "assistant",
        content: 
        "You are an intelligent note-taking app. You answer the user's questions based on their existing notes. " + 
        "The relevant notes for the query are:\n" +
        relevantNotes.map((note) => `Title: ${note.title} \n\nContent:\n${note.content}`).join("\n\n")
    };

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [systemMessage, ...messagesTruncated]
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream);



  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
