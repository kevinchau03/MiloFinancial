import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="text-center max-w-2xl">
        <h1 className="font-bold text-6xl mb-4">Worth It?</h1>
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
        <Button className="bg-white text-blue-600 px-6 py-3 font-semibold hover:bg-gray-200">
          <Link href="\signup">Start Now</Link>
        </Button>
      </div>

      {/* Footer with Branding */}
      <footer className="absolute bottom-4 text-sm">
        © 2024 Worth It. All rights reserved.
      </footer>
    </div>
  );
}
