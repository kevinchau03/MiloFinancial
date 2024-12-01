import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {/* Header Section */}
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-6xl font-bold">Worth It?</h1>
        <p className="text-lg leading-relaxed">
          Take control of your finances with <span className="font-semibold">Worth It</span>, 
          the budgeting app designed for students. Track expenses, set goals, and manage 
          your income effortlessly—all through an intuitive voice assistant and powerful 
          visual tools.
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* Button */}
        <Button className="bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-200">
          <a href="/api/auth/login">Start Now</a>
        </Button>
        <Link href="/tutorial">
          <Button className="bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-200">
            Tutorial
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
