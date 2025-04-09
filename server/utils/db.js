import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(connectionString);

export const db = client.db("practice-mongo");

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

connectDB ();
