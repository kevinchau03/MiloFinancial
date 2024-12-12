"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import { useRouter }  from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleAuthAction = () => {
    if (status === "authenticated") {
      signOut({ redirect: false }).then(() => router.push("/"));
    } else {
      signIn(); // Redirects to the sign-in page or provider selection
    }
  };

  const fullName = session?.user?.name || "Guest";


  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-between">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard, {fullName} </h1>
      <div className="grid lg:grid-cols-3">
        <div className="bg-blue-400 p-2 rounded-lg flex flex-col max-w-md min-h-md">
          <h2 className="text-xl font-semibold">Account Balance:</h2>
          <p className="text-gray-600">$10,576.98</p>
        </div>
        <div className="bg-blue-400 p-2 rounded-lg flex flex-col max-w-md min-h-md">
          <h2 className="text-xl font-semibold">Total Expenses:</h2>
          <p className="text-gray-600">$5032.11</p>
        </div>
        <div className="bg-blue-400 p-2 rounded-lg flex flex-col max-w-md min-h-md">
          <h2 className="text-xl font-semibold">Current Budget Goal:</h2>
          <p className="text-gray-600">$15,609.09</p>
        </div>
      </div>
      <button
          onClick={handleAuthAction}
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200 transition"
        >
          {status === "authenticated" ? "Sign Out" : "Sign In"}
        </button>
    </div>
  );
}

