"use client";
import { useSession } from "next-auth/react";
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

  return (
    <div className="w-screen flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center w-full px-6 py-16 text-white">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">Milo Financial</h1>
          <p className="text-base lg:text-lg mb-6 leading-relaxed">
            Empower your financial journey with Milo, your AI financial advisor. Track spending,
            visualize trends, and receive personalized advice tailored for you.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Link
              href="/login"
              className="px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-200"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 rounded-lg text-white font-semibold transition hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src="/Milo.jpg"
            alt="Milo Financial"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="flex flex-col items-center justify-center">
            <div className="lg:w-1/2 flex items-center text-center lg:text-left gap-4">
              <Image
                src="/Budget.png"
                alt="Track Spending"
                width={400}
                height={400}
                className="mb-6 rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-black">Track Spending</h3>
                <p className="text-gray-600 leading-relaxed">
                  Milo helps you make smarter financial decisions by tracking your spending,
                  visualizing trends, and offering personalized advice tailored to your needs.
                </p>
              </div>
            </div>
          <div className="lg:w-1/2 flex items-center text-center lg:text-left gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-black">AI-Powered Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Using cutting-edge AI, Milo analyzes your spending habits and provides actionable
                insights. Connect your bank account and let Milo help you achieve your financial goals.
              </p>
            </div>
            <Image
              src="/AI.png"
              alt="Artificial Intelligence"
              width={400}
              height={400}
              className="mb-6 rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      <footer className="w-full py-8 bg-foreground">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-white">
            &copy; 2024 Milo Financial. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
