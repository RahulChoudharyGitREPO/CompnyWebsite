import ProjectForm from "@/components/admin/ProjectForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
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
  const resolvedParams = await params;
  const rawProject = await Project.findById(resolvedParams.id);
  
  if (!rawProject) {
    redirect("/admin/dashboard");
  }

  const project = JSON.parse(JSON.stringify(rawProject)) as IProject;

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto min-h-screen">
      <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>
      
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Edit Project</h1>
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
