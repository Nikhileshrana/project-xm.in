import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoDB"; // Import global MongoDB connection

export async function GET() {
    try {
        const client = await clientPromise; // Use the persistent connection
        const db = client.db("IndianExp");
        const collection = db.collection("tour_packages");

        const result = await collection.find({}).toArray();

        return NextResponse.json({ success: true, data: result });

    } catch (error: any) {
        console.error("❌ Error fetching tour packages:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch tour packages", details: error.message },
            { status: 500 }
        );
    }
}
