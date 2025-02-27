import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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
        const body = await req.json();
        console.log("📩 Received Request Body:", body);

        if (!body.slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        const db = await connectDB();
        const collection = db.collection("tour_packages");

        const result = await collection.findOne({ slug: body.slug });

        if (!result) {
            return NextResponse.json({ error: "Tour package not found" }, { status: 404 });
        }

        // console.log("✅ Found Tour Package:", result);
        return NextResponse.json({ success: true, data: result });

    } catch (error: any) {
        console.error("❌ Error fetching tour packages:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch tour packages", details: error.message },
            { status: 500 }
        );
    }
}
