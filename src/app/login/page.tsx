"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            // Login request
            const loginRes = await fetch("http://localhost:4000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (loginRes.ok) {
                // Fetch user data after successful login
                const userRes = await fetch(`http://localhost:4000/api/users/${username}`);
                if (userRes.ok) {
                    const userData = await userRes.json();
    
                    // Save only relevant user data to local storage
                    const userToSave = {
                        username: userData.username,
                        email: userData.email,
                        account_balance: userData.account_balance,
                        budget: userData.budget,
                        expenses: userData.expenses,
                        revenue: userData.revenue,
                        transaction_history: userData.transaction_history,
                    };
    
                    localStorage.setItem("user", JSON.stringify(userToSave));
    
                    // Log the saved user data to the console
                    console.log("Saved user data:", userToSave);
    
                    // Redirect to dashboard
                    router.push("/dashboard");
                } else {
                    alert("Failed to fetch user data.");
                }
            } else {
                alert("Invalid username or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };
    

        return (
            <div className="flex flex-col items-center mx-4 text-center">
                <h1 className="text-6xl font-bold my-6">Log In</h1>

                {/* Input Fields */}
                <label className="text-left">Username</label>
                <input className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg" onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username..." />
                <label className="text-left">Password</label>
                <input className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." />


                <Button onClick={handleLogin}>Log In</Button>

                <p className="mt-4">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-500 underline">
                        Sign up
                    </Link>
                </p>
            </div>
        );
}
