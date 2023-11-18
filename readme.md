AI chatbot with Next.js 14, the ChatGPT API, vector embeddings, Pinecone, TailwindCSS, and Shadcn UI. The app is written in TypeScript and uses the Next.js app router. You will also learn how to set up VS Code with Prettier, the Prettier-Tailwind-Plugin, the TailwindCSS IntelliSense extension, and ESLint.

npx create-next-app@latest
npm install openai ai prisma @prisma/client @pinecone-database/pinecone @clerk/nextjs @clerk/themes next-themes prettier eslint-config-prettier eslint-config-prettier prettier-plugin-tailwindcss
npx shadcn-ui@latest init                                                                                     
npx prisma init


openai 

vercel ai package sdk.vercel.ai   
vercel ai solves 2 packages, it manages the chat messages and it helps us implement the response streaming. 

prisma is orm its how to interact with mongo db database

pinecode is the database that stores the vector embeddings - this is long term memory 
    vector embedding is where we turn a note or human readable text into an array of numbers with 1536 numbers in it and these numbers define the position in a multidimensal space. The numbers in the array contain the meaning of the text. Similar sentences/notes will send up near each other in this space, whereas completly different notes will be placed away from those similar vectors, this allows us to query these vector embedding by their meaning so if we send a request to question the chatbot we will first search for the notes that are close in their vectors(the array of numbers for the chat question), and then notes that have similar vectors - only those will be sent to chatgpt

clerk is auth 

prettier code formatter 

eslint 


https://ui.shadcn.com/ component library being used 
this doesnt have to be installed as a npm package, you copy paste the components into the project. 

mongodb atlas we are using this for the notes 

