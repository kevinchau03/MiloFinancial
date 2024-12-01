import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; 

// GET - Fetch User by Username
export async function GET(req, { params }) {
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: "Username is required." }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Accounts");
    const user = await db.collection("UserInfo").findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// PUT - Update User by Username
export async function PUT(req, { params }) {
  const { username } = params;
  const updates = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("Accounts");

    const result = await db.collection("UserInfo").updateOne(
      { username },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
