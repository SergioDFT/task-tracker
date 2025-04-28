import React from 'react'
import Image from "next/image";
import Link from "next/link";

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-20 px-10">
      <div className="max-w-lg w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to Task Tracker App</h1>
        <p className="text-gray-300 text-lg mb-8">Join our Task Tracker app and discover amazing features</p>

        <div className="flex gap-4 items-center justify-center">
          <Link
            className="rounded-md transition-all flex items-center justify-center bg-indigo-600 text-white gap-2 hover:bg-indigo-700 text-base font-semibold py-3 px-8 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1"
            href="/sign-up"
            target="_parent"
            rel="noopener noreferrer"
          >
            <Image
              className="invert"
              src="/assets/icons/globe.svg"
              alt="globe"
              width={20}
              height={20}
            />
            Join now
          </Link>

          <Link
            className="rounded-md border border-gray-500 transition-all flex items-center justify-center bg-transparent text-white gap-2 hover:bg-gray-800 text-base font-semibold py-3 px-8 transform hover:-translate-y-1"
            href="/sign-in"
            target="_parent"
            rel="noopener noreferrer"
          >
            Explore
          </Link>
        </div>
      </div>

      {/* Optional: Feature highlights section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-4">
        {[
          { title: "Personalized Task Dashboard", description: "Each user gets a private, secure dashboard where they can create, view, edit, and delete their tasks." },
          { title: "Task Management with Modals", description: "Quickly add or delete tasks without leaving the page, thanks to smooth modal interactions. " },
          { title: "Secure Auth & Data Integrity", description: "Built with Clerk authentication and Prisma ORM, the platform guarantees that each task is securely tied to its creator." }
        ].map((feature, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
