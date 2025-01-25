"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  // get the session status
  const { status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to the dashboard


  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen w-screen flex-col">


      {/* Hero Section */}
      <section className="flex w-full flex-col-reverse items-center justify-center px-6 py-16 text-white lg:flex-row">
        <div className="text-center lg:w-1/2 lg:text-left">
          <h1 className="mb-4 text-5xl font-extrabold lg:text-6xl">Milo Financial</h1>
          <p className="mb-6 text-base leading-relaxed lg:text-lg">
            Empower your financial journey with Milo, your AI financial advisor. Track spending,
            visualize trends, and receive personalized advice tailored for you.
          </p>
          <div className="flex justify-center gap-4 lg:justify-start">
            <Link
              href="/login"
              className="rounded-lg px-6 py-3 font-semibold transition hover:bg-blue-200"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="mb-8 flex justify-center lg:mb-0 lg:w-1/2">
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
      <section className="w-full bg-white px-6 py-16">
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-6 text-center lg:w-1/2 lg:text-left">
              <Image
                src="/Budget.png"
                alt="Track Spending"
                width={400}
                height={400}
                className="mb-6 rounded-lg shadow-md"
              />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-black">Track Spending</h3>
                <p className="leading-relaxed text-gray-600">
                  Milo helps you make smarter financial decisions by tracking your spending,
                  visualizing trends, and offering personalized advice tailored to your needs.
                </p>
              </div>
            </div>
          <div className="flex items-center gap-6 text-center lg:w-1/2 lg:text-left">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-black">AI-Powered Insights</h3>
              <p className="leading-relaxed text-gray-600">
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

      {/* Footer Section */}
      <footer className="w-full bg-foreground py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-white">
            &copy; 2024 Milo Financial. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
