"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        const res = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (res.ok) {
            alert("Account created successfully!");
            router.push("/login"); // Redirect to login page after successful signup
        } else {
            const errorData = await res.json();
            alert(errorData.error || "Failed to create account.");
        }
    };

    return (
        <div className="flex flex-col items-center mx-4 text-center">
            <h1 className="text-6xl font-bold my-6">Sign Up</h1>

            {/* Input Fields */}
            <label className="text-left w-full">Username</label>
            <input
                className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username..."
            />
            <label className="text-left w-full">Email</label>
            <input
                className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email..."
                type="email"
            />
            <label className="text-left w-full">Password</label>
            <input
                className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password..."
                type="password"
            />

            <Button onClick={handleSignup}>Sign Up</Button>

            <p className="mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}
