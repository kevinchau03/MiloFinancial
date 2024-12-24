import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-background">
                <header className="w-full flex justify-between items-center px-4 bg-foreground text-white border-b border-gray-200">
                    <h1>milofinancial</h1>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 rounded-lg transition hover:bg-blue-600">
                            <Link href="/dashboard/budget">Edit Budget</Link>
                        </button>
                        <button className="px-6 py-3 rounded-lg transition hover:bg-blue-600">
                            <Link href="/">Connect Bank Account</Link>
                        </button>
                        <button className="px-6 py-3 rounded-lg transition hover:bg-blue-600">
                            Sign Out
                        </button>
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}