import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("Accounts");

    const user = await db.collection("UserInfo").findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 401 });
    }

    // Compare password (bcrypt recommended)
    if (user.password !== password) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
