import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Header() {
    return (
        <header className="w-full flex justify-between items-center px-6 py-4 bg-foreground text-white border-b border-gray-300">
            {/* Brand Logo */}
            <Link href="/dashboard" className="text-2xl font-bold hover:underline">
                milofinancial
            </Link>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
                <Link href="/dashboard/budget" className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-white">
                    Edit Budget
                </Link>
                <Link href="/" className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-white">
                    Connect Bank Account
                </Link>

                <button
                    onClick={() => signOut()}
                    className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 text-white"
                    aria-label="Sign Out"
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
}

export default Header;
