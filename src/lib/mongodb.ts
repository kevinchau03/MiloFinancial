import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error("NEXT_PUBLIC_MONGO_URI is not defined");
}

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);

const clientPromise = client.connect();

export default clientPromise;
