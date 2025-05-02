"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/auth/nextjs/schemas";
import { signIn } from "@/auth/nextjs/actions";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const errorMessage = await signIn(data);
    if (!errorMessage) {
      window.location.reload();
    } else {
      setError(errorMessage || "Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 px-10">
      <div className="max-w-2xl mx-auto bg-gray-800 shadow-2xl rounded-xl overflow-hidden p-8 border border-gray-700">
        <Link
          href="/"
          className="inline-flex items-center text-sm hover:text-indigo-300 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`block w-full rounded-lg bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-300"
                } px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm placeholder-gray-400`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`block w-full rounded-lg bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-300"
                } px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm placeholder-gray-400`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Link
              href="/sign-up"
              className="inline-flex items-center text-sm hover:text-indigo-300 transition-colors duration-300"
            >
              <ArrowRightIcon className="h-4 w-4 mr-1" />
              Don&apos;t have an account?
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging on...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
