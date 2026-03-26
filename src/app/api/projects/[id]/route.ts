import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { checkAuth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const resolvedParams = await params;
    
    const project = await Project.findByIdAndUpdate(resolvedParams.id, body, { new: true, runValidators: true });
    
    if (!project) return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const resolvedParams = await params;
    const project = await Project.findByIdAndDelete(resolvedParams.id);
    
    if (!project) return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
