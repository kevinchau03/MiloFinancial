import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Finance from "@/models/Finance";

export async function GET(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Get session data to verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch finance data for the authenticated user
    const finance = await Finance.findOne({ userId: session.user.id });

    if (!finance) {
      return NextResponse.json({ error: "Finance data not found" }, { status: 404 });
    }

    // Return the finance data
    return NextResponse.json(finance, { status: 200 });
  } catch (error) {
    console.error("Error fetching finance data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
