import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB URI and global client initialization
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
let client: MongoClient | null = null;

async function connectDB() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db("IndianExp");
}

export async function GET() {
    try {
        const db = await connectDB(); // Reuse connection
        const collection = db.collection("tour_packages");

        // Fetch 4 random documents from the collection
        const result = await collection.aggregate([{ $sample: { size: 4 } }]).toArray();

        return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("❌ Error fetching random tour packages:", error);
        return NextResponse.json(
            { error: "Failed to fetch tour packages" },
            { status: 500 }
        );
    }
}
