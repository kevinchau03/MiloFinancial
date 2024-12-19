"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to the dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const renderAuthButton = () => {
    if (status === "loading") {
      return <span className="text-sm mt-7">Loading...</span>;
    }
    return (
      <Link
        href="/login"
        className="px-4 py-2 rounded-lg border-2 border-white transition bg-foreground hover:bg-white hover:text-foreground"
      >
        Sign In
      </Link>
    );
  };

  return (
    <main className="w-screen flex flex-col min-h-screen items-center justify-center px-6 lg:flex-row">
      <div className="w-1/2 p-8">
        <h1 className="text-9xl font-bold mb-4">Milo Financial</h1>
        <p className="text-sm mb-6 md:text-base">
          Empower your financial journey with Milo, your AI financial advisor. Make smarter
          financial decisions by tracking your spending, visualizing trends, and receiving
          personalized advice. Coming soon...
        </p>
        {renderAuthButton()}
      </div>
    </main>
  );
}
