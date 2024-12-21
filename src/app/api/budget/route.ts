import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { userId, budget } = body;

    // Connect to the database
    await connectDB();

    // Update the budget for the specified user
    const updatedBudget = await Budget.findOneAndUpdate(
      { userId }, // Filter by user ID
      { budget }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedBudget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error: any) {
    console.error("Error updating budget:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
