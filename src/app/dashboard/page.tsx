"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, PiggyBank, HandCoins, CircleDollarSign, Hand } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession(); // Always call this hook at the top

  interface FinanceData {
    accountBalance: number;
    expenses: number;
    income: number;
    transactions: {
      transactionId: string;
      description: string;
      amount: number;
      date: string;
      category: string;
    }[];
  }

  const [financeData, setFinanceData] = useState<FinanceData | null>(null);
  const [loadingFinance, setLoadingFinance] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch finance data
  useEffect(() => {
    if (status === "authenticated") {
      const fetchFinanceData = async () => {
        try {
          const response = await fetch("/api/finance");
          if (!response.ok) {
            throw new Error("Failed to fetch finance data");
          }
          const data = await response.json();
          setFinanceData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoadingFinance(false);
        }
      };

      fetchFinanceData();
    }
  }, [status]);

  // Handle authentication action
  const handleAuthAction = () => {
    if (status === "authenticated") {
      signOut({ redirect: false }).then(() => router.push("/"));
    } else {
      signIn();
    }
  };

  // User details
  const fullName = session?.user?.name || "Guest";

  // Conditional Rendering Logic
  if (status === "loading" || (status === "authenticated" && loadingFinance)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="">Loading data...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="">Please sign in to view your financial data.</p>
        <button
          onClick={handleAuthAction}
          className="px-4 py-2 bg-foreground text-white rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="w-screen min-h-screen">
      <header className="w-full flex justify-between items-center p-4 text-white border-b border-gray-200">
        <h1 className="text-2xl font-bold">milofinancial</h1>
        <div className="flex gap-2">
          <button onClick={() => router.push("/dashboard/budget")} className="px-4 py-2 rounded-lg border-2 border-white transition bg-foreground hover:bg-white hover:text-foreground">
          Edit Budget
          </button>
          <button onClick={() => router.push("/profile")} className="px-4 py-2 rounded-lg border-2 border-white transition bg-foreground hover:bg-white hover:text-foreground">
            Connect Bank
          </button>
          <button
            onClick={handleAuthAction}
            className="px-4 py-2 rounded-lg border-2 border-white transition bg-foreground hover:bg-white hover:text-foreground"
          >
            {status === "authenticated" ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </header>

      <main className="w-full flex container p-4 gap-4">
        {/* Finance Summary Cards */}
        <div className="grid grid-cols-4 gap-4 md:grid-cols-1">
          <div className="max-w-sm p-6 bg-foreground border border-gray-100 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">Account Balance
            </h5>
            <p className="text-xl font-bold">${financeData?.accountBalance}</p>
            <p className="mb-3 font-normal ">20% change since last month.</p>
          </div>
          <div className="max-w-sm p-6 bg-foreground border border-gray-100 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">Total Expenses
            </h5>
            <p className="text-xl font-bold">${financeData?.expenses}</p>
            <p className="mb-3 font-normal">20% change since last month.</p>
          </div>
          <div className="max-w-sm p-6 bg-foreground border border-gray-100 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">Total Income
            </h5>
            <p className="text-xl font-bold">${financeData?.income}</p>
            <p className="mb-3 font-normal ">20% change since last month.</p>
          </div>
          <div className="max-w-sm p-6 bg-foreground border border-gray-100 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">Budget Goals
            </h5>
            <p className="text-2xl font-bold">$5000.00</p>
            <p className="mb-3 font-normal ">50% to goal.</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-foreground p-6 rounded-lg shadow-md flex-grow border border-gray-400">
          <h2 className="text-xl">Recent Transactions</h2>
          <ul>
            {financeData?.transactions.slice(0, 5).map((transaction) => (
              <li
                key={transaction.transactionId}
                className="border-b border-gray-200 py-2"
              >
                <div className="flex justify-between">
                  <span className="text-lg">{transaction.description}</span>
                  <span className="text-lg font-bold">
                    ${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm ">
                  {new Date(transaction.date).toLocaleDateString()} •{" "}
                  {transaction.category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
