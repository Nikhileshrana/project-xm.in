import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { tourId, ...updateFields } = body;

        if (!tourId) {
            return NextResponse.json({ error: "Missing tourId" }, { status: 400 });
        }

        await client.connect();
        const database = client.db("IndianExp");
        const collection = database.collection("tour_packages");

        // Convert string tourId to ObjectId
        const result = await collection.updateOne(
            { _id: new ObjectId(tourId) }, 
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Tour package not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Tour package updated successfully" });

    } catch (error: any) {
        console.error("❌ Error updating tour package:", error.message);
        return NextResponse.json(
            { error: "Failed to update tour package", details: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}