'use client'

import { useState } from "react";

export default function EditBudget() {
  // State management for inputs
  const [income, setIncome] = useState("");
  const [goals, setGoals] = useState("");
  const [expenses, setExpenses] = useState([
    { category: "Rent", amount: "" },
    { category: "Groceries", amount: "" },
    { category: "Entertainment", amount: "" },
  ]);

  // Handle form submissions (mock save function)
  const handleSave = () => {
    console.log("Income:", income);
    console.log("Goals:", goals);
    console.log("Expenses:", expenses);
    alert("Your data has been saved!");
  };

  // Update expense values
  const handleExpenseChange = (index, amount) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = amount;
    setExpenses(updatedExpenses);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <h1>Edit Your Budget</h1>

      <div>
        <h2>Income</h2>
        <input
          type="number"
          placeholder="Enter your monthly income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      {/* Goals Section */}
      <div>
        <h2>Financial Goals</h2>
        <textarea
          placeholder="Enter your financial goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          rows={3}
        />
      </div>

      {/* Expenses Section */}
      <div>
        <h2>Expenses</h2>
        {expenses.map((expense, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>
              {expense.category}:
              <input
                type="number"
                placeholder={`Enter ${expense.category} amount`}
                value={expense.amount}
                onChange={(e) =>
                  handleExpenseChange(index, e.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
}
