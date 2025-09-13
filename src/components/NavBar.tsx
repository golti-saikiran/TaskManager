"use client"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from "react";
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const NavBar = () => {
    const { user } = useUser();
    return <header className="w-full h-20 bg-blue-50 flex items-center justify-between px-5 text-oklch(27.4% 0.006 286.033) fixed top-0 z-10 shadow-md ">
        <Link href="/" className="text-xl font-bold sm:text-2xl">Task Manager</Link>
        <SignedOut>
            <div className="space-x-4">
                <SignInButton >
                    <button className="px-4 py-2 font-bold text-black rounded hover:bg-blue-100 transition">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton>
                    <button className="px-4 py-2 font-bold bg-purple-500 text-white rounded hover:bg-green-600 transition">
                        Sign Up
                    </button>
                </SignUpButton>
            </div>
        </SignedOut>
        <SignedIn>
            <div className="flex items-center gap-x-10" >
                <span>Welcome {user?.firstName ?? user?.emailAddresses[0]?.emailAddress}</span>
                <UserButton afterSignOutUrl="/" />
            </div>

        </SignedIn>
    </header>
}
export default NavBar;