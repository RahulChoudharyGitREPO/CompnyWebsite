"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { IProject } from "@/models/Project";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import toast from "react-hot-toast";

interface Props {
  initialProjects: IProject[];
  isAdmin: boolean;
}

export default function ProjectsClient({ initialProjects, isAdmin: initialIsAdmin }: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsAdmin(initialIsAdmin);
  }, [initialIsAdmin]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((p) => String(p._id) === String(active.id));
        const newIndex = items.findIndex((p) => String(p._id) === String(over.id));
        const nextItems = arrayMove(items, oldIndex, newIndex);
        
        // Save the new order (only for non-placeholder projects)
        const dbItems = nextItems.filter(p => !String(p._id).startsWith("cs"));
        if (dbItems.length > 0) {
          saveOrder(dbItems);
        }
        return nextItems;
      });
    }
  };

  const saveOrder = async (dbProjects: IProject[]) => {
    setIsSaving(true);
    try {
      const orders = dbProjects.map((p, index) => ({
        id: p._id,
        order: index,
      }));

      const response = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });

      if (!response.ok) throw new Error("Failed to save order");
      toast.success("Order synchronized");
    } catch (error) {
      toast.error("Failed to save project order");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => String(p._id) !== id));
  };

  return (
    <div className="pt-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="py-16">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading 
            title="OUR WORK" 
            subtitle="A selection of recent digital products we've designed and engineered."
          />
          {isAdmin && (
            <Link 
              href="/admin/projects/new" 
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <PlusCircle size={18} /> New Project
            </Link>
          )}
        </div>
        
        {isSaving && (
          <div className="fixed top-32 right-8 z-[100] bg-indigo-600 text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl animate-bounce">
            Saving Order...
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            <SortableContext
              items={projects.map((p) => String(p._id))}
              strategy={rectSortingStrategy}
            >
              {projects.map((project, index) => (
                <ProjectCard 
                  key={String(project._id)} 
                  project={project} 
                  index={index} 
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
}
