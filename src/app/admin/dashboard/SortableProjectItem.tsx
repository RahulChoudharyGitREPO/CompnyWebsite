"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IProject } from "@/models/Project";
import { Edit, GripVertical } from "lucide-react";
import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";

interface Props {
  project: IProject;
}

export default function SortableProjectItem({ project }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(project._id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: "relative" as const,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
        isDragging ? "bg-white/10" : ""
      }`}
    >
      <td className="p-4 w-12">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-white transition-colors p-1"
        >
          <GripVertical size={20} />
        </button>
      </td>
      <td className="p-4 font-semibold tracking-tight text-white">{project.title}</td>
      <td className="p-4 text-xs text-gray-400 font-medium">
        {project.techStack.join(", ")}
      </td>
      <td className="p-4 flex gap-3 justify-end items-center">
        <Link
          href={`/admin/projects/${project._id as unknown as string}/edit`}
          className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
        >
          <Edit size={16} />
        </Link>
        <DeleteProjectButton projectId={project._id as unknown as string} />
      </td>
    </tr>
  );
}
