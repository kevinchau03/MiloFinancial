"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Textbox from "@/components/textbox";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created:", data);
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        const errorData = await response.json();
      }
    } catch (err) {
      console.log("Signup error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center mx-4 text-center">
      <h1 className="text-6xl font-extrabold my-6">Worth!?</h1>

      <label className="text-left">Username</label>
      <input className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg" onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username..."/>
      <label className="text-left">Email</label>
        <input className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email..."/>
        <label className="text-left">Password</label>
        <input className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..."/>

      <Button onClick={handleSignUp}>Sign Up</Button>

      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
