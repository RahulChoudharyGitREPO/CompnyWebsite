import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { checkAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a unique filename
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    
    // Path where the file will be saved inside the public folder setup for next.js
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    try {
      await writeFile(path.join(uploadDir, filename), buffer);
    } catch (e: any) {
       // if dir doesn't exist, we should ideally create it. For simplicity we'll try to create it.
       const fs = require("fs");
       if (!fs.existsSync(uploadDir)){
           fs.mkdirSync(uploadDir, { recursive: true });
           await writeFile(path.join(uploadDir, filename), buffer);
       } else {
           throw e;
       }
    }

    // Return the URL path to the file
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
