import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("YourDatabase");

    // Check if username or email already exists
    const existingUser = await db.collection("UserInfo").findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists." }, { status: 409 });
    }

    const existingEmail = await db.collection("UserInfo").findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }


    // Create user
    const result = await db.collection("UserInfo").insertOne({
      username,
      email,
      password,
      budget: 0,
      account_balance: 0,
      expenses: 0,
      revenue: 0,
      transaction_history: [],
    });

    return NextResponse.json({ message: "User registered successfully.", userId: result.insertedId });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
