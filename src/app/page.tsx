import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import HomeClient from "@/components/home/HomeClient";
import { cookies } from "next/headers";

// Force dynamic rendering to always fetch latest projects for the homepage
export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: IProject[] = [];
  try {
    await connectDB();
    projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).limit(4);
    projects = JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("DB connection error");
  }

  const fallbackProjects: IProject[] = [
    {
      _id: "cs1",
      title: "B2B SaaS: AI Onboarding Agent",
      description: "Automated 90% of user onboarding workflows. Result: 25% reduction in Day-1 churn within 60 days.",
      techStack: ["LLM Agents", "Next.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
      liveLink: "#",
      createdAt: new Date()
    },
    {
      _id: "cs2",
      title: "Fintech: Smart Reconciliation Engine",
      description: "Implemented real-time AI reconciliation for transaction flows. Result: Recovered $120k in leaked fees annually.",
      techStack: ["FinOps AI", "Node.js", "Redis"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
      liveLink: "#",
      createdAt: new Date()
    },
    {
      _id: "cs3",
      title: "E-comm: Predictive Ops Agent",
      description: "Autonomous inventory management and demand forecasting. Result: 15% reduction in overstock capital.",
      techStack: ["Predictive AI", "React", "Python"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      liveLink: "#",
      createdAt: new Date()
    }
  ] as unknown as IProject[];

  // Always show the 3 original placeholders first, then append any real work
  const allProjects = [...fallbackProjects, ...projects];

  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_token")?.value ? true : false;

  return <HomeClient projects={allProjects} isAdmin={isAdmin} />;
}
