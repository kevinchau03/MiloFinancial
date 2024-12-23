"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BudgetPage: React.FC = () => {
  interface BudgetData {
    budget: {
      category: string;
      budget: number;
    }[];
  }

  const [categories, setCategories] = useState<{ category: string; budget: number }[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [newBudget, setNewBudget] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // Status message for updates
  const router = useRouter();
  const { data: session, status } = useSession(); // Always call this hook at the top
  const userId = session?.user?.id;

  // Handle input changes for category and budget
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBudget(Number(e.target.value));
  };

  // Add a new category to the list
  const handleAddCategory = () => {
    if (newCategory.trim() && newBudget > 0) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { category: newCategory, budget: newBudget },
      ]);
      setNewCategory(""); // Reset input
      setNewBudget(0); // Reset input
    }
  };

  // Delete a category from the list
  const handleDeleteCategory = (index: number) => {
    setCategories((prevCategories) => prevCategories.filter((_, i) => i !== index));
  };

  // Save budgets to the database
  const handleSaveToDatabase = async () => {
    if (!userId) {
      setStatusMessage("You must be logged in to save your budget.");
      return;
    }

    try {
      const response = await fetch("/api/budget", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // User ID from session
          budget: categories, // Pass the array of categories
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save budget categories.");
      }

      const data = await response.json();
      setStatusMessage("Budget categories updated successfully!");
      console.log("Updated Data:", data);
    } catch (error) {
      console.error("Error saving to database:", error);
      setStatusMessage("Failed to update budget categories.");
    }
  };

  // Fetch budget data from the database
  useEffect(() => {
    if (status === "authenticated") {
      const fetchBudgetData = async () => {
        try {
          const response = await fetch("/api/budget");
          if (!response.ok) {
            throw new Error("Failed to fetch budget data");
          }

          const data: BudgetData = await response.json();
          // Safeguard against non-existent or malformed budget data
          if (Array.isArray(data.budget)) {
            setCategories(data.budget);
          } else {
            setCategories([]); // Default to an empty array if no budget exists
          }
        } catch (err) {
          console.error("Error fetching budget data:", err);
          setCategories([]); // Default to an empty array on error
        }
      };
      fetchBudgetData();
    }
  }, [status]);

  return (
    <div className="w-screen min-h-screen">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">milofinancial</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-lg border-2 border-white transition bg-foreground hover:bg-white hover:text-foreground"
          >
            Back
          </button>
        </div>
      </header>

      <section className="flex">
        <div className="mb-6">
          <label className="block mb-2 font-medium">Add Category</label>
          <input
            type="text"
            value={newCategory}
            onChange={handleCategoryChange}
            placeholder="Category name (e.g., Food)"
            className="rounded-md bg-foreground px-4 py-2 mb-2 w-full"
          />
          <input
            type="number"
            value={newBudget}
            onChange={handleBudgetChange}
            className="rounded-md bg-foreground px-4 py-2 mb-2 w-full"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-foreground text-white rounded-md"
          >
            Add Category
          </button>
        </div>

        <div className="bg-foreground p-6 rounded-md w-1/2">
          {categories.length === 0 ? (
            <p>No categories found. Add a category to get started.</p>
          ) : (
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li
                  key={index}
                >
                  <div>
                    <h3 className="font-medium">{category.category}</h3>
                    <p className="text-gray-600">Budget: ${category.budget}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Section for adding budgets */}
      <section >
          
      </section>

      <button
        onClick={handleSaveToDatabase}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Save to Database
      </button>
      {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
    </div>
  );
};

export default BudgetPage;
