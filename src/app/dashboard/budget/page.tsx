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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit Your Budget</h1>

      {/* Income Section */}
      <div>
        <h2>Income</h2>
        <input
          type="number"
          placeholder="Enter your monthly income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
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
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
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
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>
    </div>
  );
}
