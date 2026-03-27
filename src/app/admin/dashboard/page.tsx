import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import LogoutButton from "./LogoutButton";
import DeleteProjectButton from "./DeleteProjectButton";
import SortableProjectList from "./SortableProjectList";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const revalidate = 0; // Disable cache for dashboard

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (e) {
    redirect("/admin/login");
  }

  await connectDB();
  const rawProjects = await Project.find({}).sort({ order: 1, createdAt: -1 });
  const projects = JSON.parse(JSON.stringify(rawProjects)) as IProject[];

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
          >
            <PlusCircle size={18} /> New Project
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <SortableProjectList initialProjects={projects} />
        </div>
      </div>
    </div>
  );
}
