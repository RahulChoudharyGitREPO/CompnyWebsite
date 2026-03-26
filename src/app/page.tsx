import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import HomeClient from "@/components/home/HomeClient";

// Force dynamic rendering to always fetch latest projects for the homepage
export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: IProject[] = [];
  try {
    await connectDB();
    const rawProjects = await Project.find({}).sort({ createdAt: -1 }).limit(4);
    projects = JSON.parse(JSON.stringify(rawProjects));
  } catch (error) {
    console.error("DB connection error");
  }

  // Fallback to the requested client projects if DB is empty or offline
  if (!projects || projects.length === 0) {
    projects = [
      {
        _id: "1",
        title: "Bhavesh Holiday",
        description: "A comprehensive travel and holiday booking platform offering seamless user experiences.",
        techStack: ["React", "Next.js", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
        liveLink: "https://share.google/owwuUEc28hPUOH5kz",
        createdAt: new Date()
      },
      {
        _id: "2",
        title: "Leonardi Premium Fashion",
        description: "An elegant e-commerce platform for high-end digital luxury fashion and accessories.",
        techStack: ["Next.js", "Shopify API", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop",
        liveLink: "https://share.google/SnkKTTfux5kvLa5b8",
        createdAt: new Date()
      },
      {
        _id: "3",
        title: "VATOM Digital Payments",
        description: "A secure, lightning-fast digital payment solution tailored for modern enterprise services.",
        techStack: ["TypeScript", "Node.js", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
        liveLink: "https://share.google/lWwfY2WKjnLJQCwp9",
        createdAt: new Date()
      }
    ] as unknown as IProject[];
  }

  return <HomeClient projects={projects} />;
}
