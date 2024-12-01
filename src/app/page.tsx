import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 md:px-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-4xl md:text-6xl mb-4">Milo Financial Aid</h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl">
            Take control of your finances with <span className="font-semibold">Milo Financial Aid</span>,
            the budgeting pet designed for students. Track expenses, set goals, and manage
            your income effortlessly—all through an intuitive voice assistant and powerful
            visual tools.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <img 
            src="Milo.jpg" 
            alt="Milo Financial Aid" 
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <Button size="lg" className="w-full md:w-auto px-8 py-6 text-lg">
          <Link href="/signup">Start Now</Link>
        </Button>
      </div>

      {/* Footer with Branding */}
      <footer className="mt-16 md:absolute md:bottom-4 text-sm text-gray-600">
        © 2024 Worth It. All rights reserved.
      </footer>
    </div>
  );
}