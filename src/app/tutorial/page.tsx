import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Tutorial() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="max-w-2xl text-center">
                <h1 className="mb-4 text-6xl font-bold">Using Worth It</h1>
                <p className="text-lg leading-relaxed">
                    Follow these simple steps to get started
                </p>
            </div>
            <div className="m:grid-cols-3 mt-8 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg border p-6 shadow-md hover:shadow-lg">
                    <h2 className="mb-2 text-2xl font-bold">1. Sign Up</h2>
                    <p className="text-sm leading-relaxed">
                        Create your account with your username, email, and password. This ensures
                        your data is securely stored and accessible only to you.
                    </p>
                </div>
                <div className="rounded-lg border p-6 shadow-md hover:shadow-lg">
                    <h2 className="mb-2 text-2xl font-bold">2. Log In</h2>
                    <p className="text-sm leading-relaxed">
                        Access your personalized dashboard by logging in with your username and password.
                    </p>
                </div>
                <div className="rounded-lg border p-6 shadow-md hover:shadow-lg">
                    <h2 className="mb-2 text-2xl font-bold">3. Enter Financial Information</h2>
                    <p className="text-sm leading-relaxed">
                        Add your budget, revenue, and expenses. Our tools will help you manage your
                        finances effectively.
                    </p>
                </div>
                <div className="rounded-lg border p-6 shadow-md hover:shadow-lg">
                    <h2 className="mb-2 text-2xl font-bold">4. Interact with Your Assistant</h2>
                    <p className="text-sm leading-relaxed">
                        Use the analytics section to optimize spending, maximize revenue, and
                        achieve financial independence.
                    </p>
                </div>
                <div className="rounded-lg border p-6 shadow-md hover:shadow-lg">
                    <h2 className="mb-2 text-2xl font-bold">5. Track Your Goals</h2>
                    <p className="text-sm leading-relaxed">
                        Set financial goals like saving for a car or reducing expenses. Track your
                        progress effortlessly with visual tools.
                    </p>
                </div>
                <div className="rounded-lg border p-6 shadow-md hover:shadow-lg">
                    <h2 className="mb-2 text-2xl font-bold">6. Optimize Your Finance</h2>
                    <p className="text-sm leading-relaxed">
                        Use the analytics section to optimize spending, maximize revenue, and
                        achieve financial independence.
                    </p>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="mt-10 flex gap-4">
                <Link href="/signup">
                    <Button className="bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
                        Get Started
                    </Button>
                </Link>
                <Link href="/">
                    <Button className="bg-gray-600 px-6 py-3 font-semibold text-white hover:bg-gray-700">
                        Home Menu
                    </Button>
                </Link>
            </div>

            {/* Footer with Branding */}
            <footer className="absolute bottom-4 text-sm">
                © 2024 Worth It. All rights reserved.
            </footer>
        </div>
    );
}


