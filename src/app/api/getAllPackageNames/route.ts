import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
let client: MongoClient | null = null;

async function connectToDB() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db("IndianExp"); // Replace with your database name
}

export async function GET() {
    try {
        const database = await connectToDB();
        const collection = database.collection("tour_packages");

        // Fetch only the slug field from all documents
        const slugs = await collection.find({}, { projection: { slug: 1, _id: 0 } }).toArray();
        
        // Extract slugs into an array of strings
        const packageNames = slugs.map((doc) => doc.slug);

        return NextResponse.json({ packageNames });
    } catch (error) {
        console.error("❌ Error fetching tour package slugs:", error);
        return NextResponse.json(
            { error: "Failed to fetch tour package slugs" },
            { status: 500 }
        );
    }
}
