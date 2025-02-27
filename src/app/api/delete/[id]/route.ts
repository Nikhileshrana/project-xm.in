import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;

    await client.connect();
    const database = client.db("IndianExp"); // Replace with your database name
    const collection = database.collection("tour_packages");

    // Delete the tour package with the specified ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Tour package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tour package deleted successfully",
    });

  } catch (error: any) {
    console.error("❌ Error deleting tour package:", error.message);
    return NextResponse.json(
      { error: "Failed to delete tour package", details: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
