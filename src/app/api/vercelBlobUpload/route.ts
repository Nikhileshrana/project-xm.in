import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
    try {
        const formData = await req.formData(); // Parse incoming form data
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer(); // Convert to buffer
        const buffer = Buffer.from(bytes);

        const filename = `uploads/${Date.now()}-${file.name}`;

        const { url } = await put(filename, buffer, { 
            access: "public", 
            token: process.env.VERCEL_BLOB_READ_WRITE_TOKEN || "vercel token here", // Use the environment variable
        });

        return NextResponse.json({ success: true, url });
    } catch (error: any) {
        return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
    }
}
