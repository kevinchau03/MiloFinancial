"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Transaction {
  purchase: string;
  price: number;
  date: string;
}

export default function BudgetPage() {
  const [budgetData, setBudgetData] = useState({
    username: "",
    account_balance: "",
    budget: "",
    expenses: "",
    revenue: "",
    transaction_history: {} as Record<string, Transaction>,
  });

  // Load budget data from localStorage on page load
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBudgetData({
        username: parsedData.username || "",
        account_balance: parsedData.account_balance || "",
        budget: parsedData.budget || "",
        expenses: parsedData.expenses || "",
        revenue: parsedData.revenue || "",
        transaction_history: parsedData.transaction_history || {},
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setBudgetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Save budget data via PUT request
  const handleSubmit = async () => {
    try {
      // Prepare data to send
      const dataToSend = {
        budget: budgetData.budget,
        account_balance: budgetData.account_balance,
        expenses: budgetData.expenses,
        revenue: budgetData.revenue,
        transaction_history: budgetData.transaction_history
      };

      // Send PUT request to update user data
      const response = await fetch(`http://localhost:4000/api/users/${budgetData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User updated successfully:", result);
        alert("Your budget has been updated successfully!");

        const updatedUserData = {
          ...budgetData,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));

      } else {
        const error = await response.json();
        console.error("Error updating user data:", error);
        alert(error.error || "Failed to update user data.");
      }
    } catch (error) {
      console.error("Error submitting budget:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!budgetData) {
    return <p className="text-center">Loading budget data...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Manage Your Budget</h1>

      {/* Account Balance */}
      <div className="mb-4">
        <label className="block mb-1">Account Balance:</label>
        <Input
          type="number"
          value={budgetData.account_balance}
          onChange={(e) => handleChange("account_balance", e.target.value)}
          placeholder={
            budgetData.account_balance
              ? `Current: ${budgetData.account_balance}`
              : "Enter new data"
          }
        />
      </div>

      {/* Budget */}
      <div className="mb-4">
        <label className="block mb-1">Budget:</label>
        <Input
          type="number"
          value={budgetData.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
          placeholder={
            budgetData.budget
              ? `Current: ${budgetData.budget}`
              : "Enter new data"
          }
        />
      </div>

      {/* Expenses */}
      <div className="mb-4">
        <label className="block mb-1">Expenses:</label>
        <Input
          type="number"
          value={budgetData.expenses}
          onChange={(e) => handleChange("expenses", e.target.value)}
          placeholder={
            budgetData.expenses
              ? `Current: ${budgetData.expenses}`
              : "Enter new data"
          }
        />
      </div>

      {/* Revenue */}
      <div className="mb-4">
        <label className="block mb-1">Revenue:</label>
        <Input
          type="number"
          value={budgetData.revenue}
          onChange={(e) => handleChange("revenue", e.target.value)}
          placeholder={
            budgetData.revenue
              ? `Current: ${budgetData.revenue}`
              : "Enter new data"
          }
        />
      </div>

      {/* Transactions */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold">Transaction History:</label>
        {Object.keys(budgetData.transaction_history).length > 0 ? (
          <ul className="p-4 rounded-md">
            {Object.entries(budgetData.transaction_history).map(([key, transaction], index) => (
              <li key={index} className="flex justify-between mb-2">
                <div>
                  <span>Category:</span> {transaction.purchase}
                </div>
                <div>
                  <span>Amount:</span> ${transaction.price}
                </div>
                <div>
                  <span>Date:</span>{" "}
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transactions found.</p>
        )}
      </div>


      <Button onClick={handleSubmit}>Save Changes</Button>
    </div>
  );
}
