import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/agency";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  image: { type: String, required: true },
  liveLink: { type: String },
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const projects = [
      {
        title: "Bhavesh Holiday",
        description: "A comprehensive travel and holiday booking platform offering seamless user experiences.",
        techStack: ["React", "Next.js", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop", // airplane/travel aesthetic
        liveLink: "https://share.google/owwuUEc28hPUOH5kz"
      },
      {
        title: "Leonardi Premium Fashion",
        description: "An elegant e-commerce platform for high-end digital luxury fashion and accessories.",
        techStack: ["Next.js", "Shopify API", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop", // luxury shopping aesthetic
        liveLink: "https://share.google/SnkKTTfux5kvLa5b8"
      },
      {
        title: "VATOM Digital Payments",
        description: "A secure, lightning-fast digital payment solution tailored for modern enterprise services.",
        techStack: ["TypeScript", "Node.js", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop", // finance/tech aesthetic
        liveLink: "https://share.google/lWwfY2WKjnLJQCwp9"
      }
    ];

    await Project.insertMany(projects);
    console.log("Successfully inserted 3 client projects!");
  } catch (err) {
    console.error("Error inserting projects:", err);
  } finally {
    process.exit(0);
  }
}

seed();
