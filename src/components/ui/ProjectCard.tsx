"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Edit, Trash2, GripVertical } from "lucide-react";
import { IProject } from "@/models/Project";
import TiltCard from "@/components/ui/TiltCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import DeleteProjectButton from "@/app/admin/dashboard/DeleteProjectButton";

interface ProjectCardProps {
  project: IProject;
  index: number;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function ProjectCard({ project, index, isAdmin = false, onDelete }: ProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(project._id),
    disabled: !isAdmin,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.6 : 1,
  };

  const isPlaceholder = String(project._id).startsWith("cs");

  return (
    <div ref={setNodeRef} style={style} className="h-full relative group/card">
      <motion.div
        initial={isDragging ? undefined : { opacity: 0, y: 50 }}
        whileInView={isDragging ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <TiltCard className={`group relative flex flex-col bg-[#111] rounded-3xl overflow-hidden border transition-colors h-full ${
          isDragging ? "border-white/20 ring-4 ring-white/10" : "border-white/5 hover:border-white/20"
        }`}>
          {/* Admin Overlays */}
          {isAdmin && (
            <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
              {!isPlaceholder && (
                <>
                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-black transition-all"
                    title="Edit Project"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeleteProjectButton 
                    projectId={String(project._id)} 
                    onDelete={onDelete}
                    className="p-2 bg-red-500/20 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                  />
                </>
              )}
              <button
                {...attributes}
                {...listeners}
                className="p-2 bg-white/10 rounded-xl text-white cursor-grab active:cursor-grabbing hover:bg-white/20 transition-all shadow-lg"
                title="Drag to Reorder"
              >
                <GripVertical size={16} />
              </button>
            </div>
          )}

          <div className="relative w-full aspect-video overflow-hidden rounded-3xl p-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
                  >
                     View Live <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-300 transition-colors tracking-tight">{project.title}</h3>
            <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[10px] uppercase font-black tracking-widest bg-white/5 border border-white/10 rounded-full text-gray-400 group-hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}
