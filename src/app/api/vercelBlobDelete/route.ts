import { NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function DELETE(req: Request) {
    try {
        const { url } = await req.json(); // Parse request body

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, { status: 400 });
        }

        await del(url, {
            token: process.env.VERCEL_BLOB_READ_WRITE_TOKEN || "vercel token here", // Use environment variable
        });

        return NextResponse.json({ success: true, message: "File deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: "Deletion failed", details: error.message }, { status: 500 });
    }
}