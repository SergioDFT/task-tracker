import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-10 ph-6">
      <SignIn />
    </div>
  );
}
