require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB URI
const uri = `mongodb+srv://user:user@cluster0.heap2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Get the database and collection
    const accounts = client.db('Accounts');

    return client.db('Accounts');
    // If there's an error connecting to MongoDB. Check for updated roles or passwords
  } catch (error) {
    console.log("Error connecting to MongoDB");
    throw error;
  }
}

module.exports = connectToDatabase;