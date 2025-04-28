import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="sticky top-0 z-40 bg-white shadow-md">
      <SignedIn>
        <div className="flex justify-end text-center p-4 bg-gradient-to-r from-slate-900 to-slate-800">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex justify-end items-center bg-gradient-to-r from-slate-900 to-slate-800 p-4 shadow-lg">
          <Link href="/sign-in">
            <button className="flex items-center mr-8 text-gray-200 hover:text-white transition-colors duration-300 group">
              <Image
                src="/assets/icons/account.svg"
                height={20}
                width={20}
                alt="login"
                className="mr-2 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-medium">Sign In</span>
            </button>
          </Link>

          <Link href="/sign-up">
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/30">
              <Image
                src="assets/icons/sign-up.svg"
                height={20}
                width={20}
                alt="Sign up"
                className="mr-2"
              />
              <span className="font-medium">Sign Up</span>
            </button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default Header;