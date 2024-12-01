"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoryChart from "@/components/app-piechart";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("User data loaded", storedUser);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return <p className="text-center">Loading user data...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">{user.username}'s Dashboard</h1>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses:</CardTitle>
            <CardDescription>How much are you spending?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.expenses}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Income:</CardTitle>
            <CardDescription>How much are you making?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.revenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal:</CardTitle>
            <CardDescription>Japan Trip</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.budget}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Balance:</CardTitle>
            <CardDescription>Your Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.account_balance}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <CategoryChart />
      </div>
      <div className="flex gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={handleOpenModal}
          className="flex-grow"
        >
          Talk To Assistant
        </Button>
        <Link href="/dashboard/budget" className="flex-grow">
          <Button variant="default" size="lg" className="w-full">
            Edit Manually
          </Button>
        </Link>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-card rounded-lg p-4 shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-xl font-bold mb-4">Assistant</h2>
            <p>How can I assist you today?</p>
            <div className="mt-4 flex justify-end">
              <Button variant="default" size="sm" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
