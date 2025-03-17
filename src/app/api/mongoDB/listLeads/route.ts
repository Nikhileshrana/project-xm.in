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
        const collection = db.collection("leads");
        const leads = await collection.find({}).toArray();
        return NextResponse.json({
            success: true,
            data: leads
        });
    } catch (error: any) {
        console.error("❌ Error fetching bookings:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch bookings", details: error.message },
            { status: 500 }
        );
    }
}