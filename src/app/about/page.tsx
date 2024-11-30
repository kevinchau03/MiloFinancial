import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-6xl">Is It Worth?</h1>
      <p>A budgetting assistant in your wallet</p>
      <div className="flex">
        <Link href="/dashboard">
          <Button>Learn More</Button>
        </Link>
        <Button><a href="/api/auth/login">Start Now</a></Button>
      </div>
    </div>
  );
}
