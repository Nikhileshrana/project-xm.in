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
        const { startDate, adults, children, name, email, phone, paymentMethod, tourPackageBooked, tourPackagePrice } = data;

        // Check if required fields are provided
        if (!name || !email || !phone || !tourPackageBooked) {
            throw new Error("Missing required booking details.");
        }

        // Connect to the database and get the collection
        const db = await connectDB();
        const collection = db.collection("bookings");

        // Prepare the booking data
        const bookingData = {
            startDate: new Date(startDate), 
            adults: parseInt(adults, 10) || 1,
            children: parseInt(children, 10) || 0,
            name,
            email,
            phone,
            paymentMethod: paymentMethod || "Pay on Arrival",
            tourPackageBooked,
            tourPackagePrice: parseFloat(tourPackagePrice),
            createdAt: new Date()
        };

        // Insert the booking data into the collection
        const result = await collection.insertOne(bookingData);

        // Return success response
        return NextResponse.json({
            success: true,
            message: "Booking saved successfully",
            data: result
        });
    } catch (error: any) {
        console.error("❌ Error inserting booking data:", error.message);
        return NextResponse.json(
            { error: "Failed to save booking", details: error.message },
            { status: 500 }
        );
    }
}
