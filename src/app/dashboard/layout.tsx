'use client'
import Link from "next/link";
import { signOut } from "next-auth/react";
import Header from "@/app/components/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-background">
                <Header />
                <main className=" mx-auto px-2 py-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
