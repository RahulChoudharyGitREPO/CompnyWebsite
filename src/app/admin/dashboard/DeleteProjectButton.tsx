"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Project deleted");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (e) {
      toast.error("Server error");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500/80 rounded-lg transition"
      aria-label="Delete project"
    >
      <Trash2 size={16} />
    </button>
  );
}
