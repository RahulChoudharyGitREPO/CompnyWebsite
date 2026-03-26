import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import LogoutButton from "./LogoutButton";
import DeleteProjectButton from "./DeleteProjectButton";

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
  const rawProjects = await Project.find({}).sort({ createdAt: -1 });
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-semibold text-gray-300">Project</th>
                <th className="p-4 font-semibold text-gray-300">Tech Stack</th>
                <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    No projects found. Add your first project!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id as unknown as string} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{project.title}</td>
                    <td className="p-4 text-sm text-gray-400">
                      {project.techStack.join(", ")}
                    </td>
                    <td className="p-4 flex gap-3 justify-end">
                      <Link
                        href={`/admin/projects/${project._id as unknown as string}/edit`}
                        className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteProjectButton projectId={project._id as unknown as string} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
