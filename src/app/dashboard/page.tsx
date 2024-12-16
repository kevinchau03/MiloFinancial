"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  // Render loading state for session
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="w-screen h-screen flex flex-col items-center p-4">
      <header className="w-full flex justify-between items-center p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Welcome, {fullName}</h1>
        <button
          onClick={handleAuthAction}
          className="px-4 py-2 rounded-lg border-white border-2 transition"
        >
          {status === "authenticated" ? "Sign Out" : "Sign In"}
        </button>
      </header>

      <main className="w-full flex flex-col gap-4 mt-6">
        {status === "authenticated" && loadingFinance && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500">Loading finance data...</p>
          </div>
        )}

        {status === "authenticated" && error && (
          <div className="bg-red-100 p-6 rounded-lg shadow-md">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {status === "authenticated" && financeData && (
          <>
            <div className="bg-slate-400 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Account Balance</h2>
              <p className="text-gray-700 text-lg">${financeData.accountBalance}</p>
            </div>
            <div className="bg-slate-400 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Total Expenses</h2>
              <p className="text-gray-700 text-lg">${financeData.expenses}</p>
            </div>
            <div className="bg-slate-400 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Total Income</h2>
              <p className="text-gray-700 text-lg">${financeData.income}</p>
            </div>
            <div className="bg-slate-400 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <ul>
                {financeData.transactions.slice(0, 5).map((transaction) => (
                  <li
                    key={transaction.transactionId}
                    className="border-b border-gray-200 py-2"
                  >
                    <div className="flex justify-between">
                      <span>{transaction.description}</span>
                      <span className="text-gray-600">${transaction.amount.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()} •{" "}
                      {transaction.category}
                    </div>
                  </li>
                ))}
              </ul>            </div>
          </>
        )}

        {status === "unauthenticated" && (
          <div className="bg-slate-400 p-6 rounded-lg shadow-md">
            <p className="text-gray-500">Please sign in to view your financial data.</p>
          </div>
        )}
      </main>
    </div>
  );
}
