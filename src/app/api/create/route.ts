import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { imageUrl, heading1, heading2, description, price, rating, location, duration, keywords, whatIncluded, whatNotIncluded } = data;

        if (!imageUrl) {
            throw new Error("Image URL is missing. Make sure to upload an image.");
        }

        const numericPrice = parseFloat(price);
        const numericRating = parseFloat(rating);
        const stringDuration = String(duration);

        await client.connect();
        const database = client.db("IndianExp"); // Replace with your database name
        const collection = database.collection("tour_packages");


        function convertStringToSlug(str:any) {
            return str
              .toLowerCase()              // Convert to lowercase
              .replace(/\s+/g, '-')        // Replace spaces with hyphens
              .replace(/[^\w-]+/g, '');    // Remove any non-alphanumeric characters (except hyphens)
          }
        const slug = convertStringToSlug(heading1);

        const result = await collection.insertOne({
            slug,
            imageURL: imageUrl,
            heading1,
            heading2,
            description,
            price: numericPrice,
            rating: numericRating,
            location,
            duration: stringDuration,
            keywords,
            whatIncluded, 
            whatNotIncluded,
        });

        return NextResponse.json({
            success: true,
            message: "Tour package created successfully",
            data: result, // Return the inserted document
        });

    } catch (error: any) {
        console.error("❌ Error inserting data:", error.message);
        return NextResponse.json(
            { error: "Failed to create tour package", details: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
