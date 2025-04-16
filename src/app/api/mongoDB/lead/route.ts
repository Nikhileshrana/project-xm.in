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

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { country, message, email, phone } = data;

        // Check if required fields are provided
        if ( !email || !phone ) {
            throw new Error("Missing required booking details.");
        }

        // Connect to the database and get the collection
        const db = await connectDB();
        const collection = db.collection("leads");

        // Prepare the booking data
        const leadsData = {
            email,
            phone,
            country,
            message,
            createdAt: new Date()
        };

        // Insert the booking data into the collection
        const result = await collection.insertOne(leadsData);

        // Return success response
        return NextResponse.json({
            success: true,
            message: "Lead saved successfully",
            data: result
        });
    } catch (error: any) {
        console.error("❌ Error inserting Lead data:", error.message);
        return NextResponse.json(
            { error: "Failed to save lead", details: error.message },
            { status: 500 }
        );
    }
}
