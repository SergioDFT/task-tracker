import { logOut } from '@/auth/nextjs/actions';
import { getCurrentUser } from '@/auth/nextjs/currentUser'; 
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default async function Header() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div className="sticky top-0 z-40 bg-white shadow-md">
      {user ? (
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-900 to-slate-800">
          <div>
            <span className="font-medium text-white">{user.name}</span>
          </div>
          <form action={logOut}>
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <ArrowLeftEndOnRectangleIcon className="h-4 w-4 mr-1" />
              Log out
            </button>
          </form>
        </div>


      ) : (
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
                src="/assets/icons/sign-up.svg"
                height={20}
                width={20}
                alt="Sign up"
                className="mr-2"
              />
              <span className="font-medium">Sign Up</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}