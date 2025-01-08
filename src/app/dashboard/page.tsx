"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Dashboard: React.FC = () => {
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
  const [categories, setCategories] = useState<{ category: string; budget: number }[]>([]);
  const { data: session, status } = useSession();

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
          console.error("Error fetching finance data:", err);
        } finally {
          setLoadingFinance(false);
        }
      };

      fetchFinanceData();
    }
  }, [status]);

  // Placeholder categories for now
  useEffect(() => {
    setCategories([
      { category: "Food", budget: 300 },
      { category: "Rent", budget: 1200 },
      { category: "Savings", budget: 500 },
    ]);
  }, []);

  if (status === "loading" || (status === "authenticated" && loadingFinance)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Please sign in to view your financial data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background">
      {/* Finance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-foreground border border-gray-100 rounded-lg shadow">
          <h5 className="text-lg font-bold">Account Balance</h5>
          <p className="text-2xl font-bold">${financeData?.accountBalance}</p>
          <p className="text-sm">20% change from last month.</p>
        </div>
        <div className="p-4 bg-foreground border border-gray-100 rounded-lg shadow">
          <h5 className="text-lg font-bold">Total Expenses</h5>
          <p className="text-2xl font-bold">${financeData?.expenses}</p>
          <p className="text-sm">20% change from last month.</p>
        </div>
        <div className="p-4 bg-foreground border border-gray-100 rounded-lg shadow">
          <h5 className="text-lg font-bold">Total Income</h5>
          <p className="text-2xl font-bold">${financeData?.income}</p>
          <p className="text-sm">20% change from last month.</p>
        </div>
        <div className="p-4 bg-foreground border border-gray-100 rounded-lg shadow">
          <h5 className="text-lg font-bold">Budget Goals</h5>
          <p className="text-2xl font-bold">$5000</p>
          <p className="text-sm">20% change from last month.</p>
        </div>
      </div>

      {/* Transactions and Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-foreground p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
          <ul className="space-y-2 items-center">
            {financeData?.transactions.slice(0, 5).map((transaction) => (
              <li key={transaction.transactionId} className="py-2">
                <div className="flex justify-between">
                  <span>{transaction.description}</span>
                  <span className="font-bold">${transaction.amount.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-foreground p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold mb-2">Your Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="py-2">
                <div className="flex justify-between">
                  <span>{category.category}</span>
                  <span className="font-bold">${category.budget}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
