import { SignUp } from "@clerk/nextjs";
import { Metadata } from "Next"


export const metadata: Metadata = {
    title: "NoteChat - Sign Up"
}

export default function SignUpPage() {
    return(
        <div className="flex h-screen items-center justify-center">
            <SignUp appearance={{ variables: { colorPrimary: "#0f172a" } }} />
        </div>
    )
}