import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Our Work | Agency",
  description: "Explore our recent projects and technical expertise.",
};

// Force dynamic rendering to prevent build-time DB connection
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: IProject[] = [];
  try {
    await connectDB();
    const rawProjects = await Project.find({}).sort({ createdAt: -1 });
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

  return (
    <div className="pt-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="py-16">
        <SectionHeading 
          title="OUR WORK" 
          subtitle="A selection of recent digital products we've designed and engineered."
        />
        
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">No projects yet.</h3>
            <p>Admin hasn't uploaded any projects to the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project._id as unknown as string} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
