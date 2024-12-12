"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to the dashboard
  if (status === "authenticated") {
    router.push("/dashboard");
  }

  const renderAuthButton = () => {
    if (status === "loading") {
      return <span className="text-sm mt-7">Loading...</span>;
    }
    return (
      <Link
        href="/login"
        className="mt-4 p-4 border-white border-2 rounded-full transition-all"
      >
        Sign In
      </Link>
    );
  };

  return (
    <main className="w-screen flex flex-col min-h-screen items-center justify-center px-6 lg:flex-row">
      <div className="w-1/2 p-8">
        <h1 className="text-6xl font-bold mb-4">Milo Financial</h1>
        <p className="text-sm mb-6 md:text-base">
          Empower your financial journey with Milo, your AI financial advisor. Make smarter
          financial decisions by tracking your spending, visualizing trends, and receiving
          personalized advice.
        </p>
        {renderAuthButton()}
      </div>
      <Image src="/Milo.jpg" alt="Milo" width={500} height={500} className="rounded-xl"/>
    </main>
  );
}
