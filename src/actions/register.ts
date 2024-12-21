"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Finance from "@/models/Finance";
import Budget from "@/models/Budget";
import bcrypt from "bcryptjs";

export const register = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  try {
    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Create a finance entry linked to this user
    await Finance.create({
      userId: newUser._id, // Link the user's ID to the finance record
      accountBalance: 0, // Default values
      expenses: 0,
      income: 0,
      transactions: [], // Empty transactions array
    });

    // Create a budget entry linked to this user
    await Budget.create({
      userId: newUser._id, // Link the user's ID to the budget record
      budget: [], // Empty array for categories
    });

    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "An error occurred during registration." };
  }
};
