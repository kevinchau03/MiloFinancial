import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGO_URI; // Add your MongoDB connection string to `.env.local`

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client.db("Accounts"); // Replace "Accounts" with your database name
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const db = await connectToDatabase();
      const usersCollection = db.collection("UserInfo"); // Replace with your collection name

      // Check if the username or email already exists
      const existingUser = await usersCollection.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const result = await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: "User created successfully", id: result.insertedId });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
