import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="max-w-4xl">
        <div className="flex flex-col items-center ">
          <h1 className="font-bold text-6xl mb-4">Milo Financial Aid</h1>
          <p className="text-lg leading-relaxed">
            Take control of your finances with <span className="font-semibold">Milo Financial Aid</span>,
            the budgeting pet designed for students. Track expenses, set goals, and manage
            your income effortlessly—all through an intuitive voice assistant and powerful
            visual tools.
          </p>
        </div>
        <img src="/milo.jpg" alt="Milo Financial Aid" className="w-1/2 mx-auto mt-8 rounded-md" />
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* Button */}
        <Button>
          <Link href="/signup">Start Now</Link>
        </Button>
      </div>

      {/* Footer with Branding */}
      <footer className="absolute bottom-4 text-sm">
        © 2024 Worth It. All rights reserved.
      </footer>
    </div>
  );
}
