import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black ph-6">
            <SignUp />
        </div>
    );
}