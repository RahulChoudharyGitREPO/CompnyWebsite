import ProjectForm from "@/components/admin/ProjectForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export default async function NewProjectPage() {
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

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto min-h-screen">
      <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>
      
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Add New Project</h1>
      <ProjectForm />
    </div>
  );
}
