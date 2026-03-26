"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IProject } from "@/models/Project";

interface ProjectFormProps {
  initialData?: IProject;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    techStack: initialData?.techStack.join(", ") || "",
    image: initialData?.image || "",
    liveLink: initialData?.liveLink || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setFormData({ ...formData, image: data.url });
        toast.success("Image uploaded!");
      } else {
        toast.error(data.message || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert techStack string to array
    const submitData = {
      ...formData,
      techStack: formData.techStack.split(",").map(i => i.trim()).filter(Boolean)
    };

    try {
      const url = isEdit ? `/api/projects/${initialData?._id}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(isEdit ? "Project updated" : "Project added");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to save project");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[#0a0a0a] p-8 rounded-2xl border border-white/10">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Title <span className="text-red-500">*</span></label>
        <input required name="title" value={formData.title} onChange={handleChange} className="bg-[#111] p-3 rounded-xl border border-white/5 text-white" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Description <span className="text-red-500">*</span></label>
        <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="bg-[#111] p-3 rounded-xl border border-white/5 text-white resize-none" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Tech Stack (comma separated) <span className="text-red-500">*</span></label>
        <input required name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, Next.js" className="bg-[#111] p-3 rounded-xl border border-white/5 text-white" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Project Image URL <span className="text-red-500">*</span></label>
        <div className="flex gap-4">
          <input required name="image" value={formData.image} onChange={handleChange} placeholder="/uploads/image.png or https://..." className="bg-[#111] p-3 rounded-xl border border-white/5 text-white flex-1" />
          <label className="bg-white/10 hover:bg-white/20 transition cursor-pointer px-4 flex items-center justify-center rounded-xl text-sm font-medium">
            {uploading ? "Uploading..." : "Upload File"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-400">Live Link (Optional)</label>
        <input name="liveLink" value={formData.liveLink} onChange={handleChange} className="bg-[#111] p-3 rounded-xl border border-white/5 text-white" />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-medium border border-white/20 text-white hover:bg-white/5">Cancel</button>
        <button type="submit" disabled={loading || uploading} className="px-6 py-3 rounded-xl font-medium bg-white text-black hover:bg-gray-200 disabled:opacity-70">
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
