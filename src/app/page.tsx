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
      title: "D2C Brand: WhatsApp Sales Bot",
      description: "Automated 80% of customer support on WhatsApp. Result: 2.5x increase in repeat orders within 3 months.",
      techStack: ["WhatsApp API", "AI Agents", "Next.js"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
      liveLink: "https://share.google/owwuUEc28hPUOH5kz",
      createdAt: new Date()
    },
    {
      _id: "cs2",
      title: "Manufacturing MSME: Inventory Dashboard",
      description: "Built custom tracking dashboard for raw materials. Result: Saved ₹50,000/month by reducing material waste.",
      techStack: ["Business BI", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      liveLink: "https://share.google/SnkKTTfux5kvLa5b8",
      createdAt: new Date()
    },
    {
      _id: "cs3",
      title: "VATOM: AI Predictive Payments",
      description: "A secure, lightning-fast digital payment solution with AI-driven fraud detection and settlement.",
      techStack: ["TypeScript", "Node.js", "AI Logic"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
      liveLink: "https://share.google/lWwfY2WKjnLJQCwp9",
      createdAt: new Date()
    }
  ] as unknown as IProject[];

  // Always show the 3 original placeholders first, then append any real work
  const allProjects = [...fallbackProjects, ...projects];

  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_token")?.value ? true : false;

  return <HomeClient projects={allProjects} isAdmin={isAdmin} />;
}
