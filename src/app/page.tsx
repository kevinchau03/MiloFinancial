import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-6xl">Is It Worth?</h1>
      <p>A budgetting assistant in your wallet</p>
      <div className="flex">
        <Link href="/dashboard">
          <button className="border-2 border-white p-2 rounded-md">Head over to your dashboard</button>
        </Link>
        <Link href="/signup">
          <button className="border-2 border-white p-2 rounded-md">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
