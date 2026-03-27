"use client";

import { useState } from "react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { IProject } from "@/models/Project";
import SortableProjectItem from "./SortableProjectItem";
import toast from "react-hot-toast";

interface Props {
  initialProjects: IProject[];
}

export default function SortableProjectList({ initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [isSaving, setIsSaving] = useState(false);

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
        
        // Save the new order
        saveOrder(nextItems);
        return nextItems;
      });
    }
  };

  const saveOrder = async (newProjects: IProject[]) => {
    setIsSaving(true);
    try {
      const orders = newProjects.map((p, index) => ({
        id: p._id,
        order: index,
      }));

      const response = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });

      if (!response.ok) throw new Error("Failed to save order");
      toast.success("Order saved!");
    } catch (error) {
      toast.error("Failed to save project order");
    } finally {
      setIsSaving(false);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="p-20 text-center text-gray-500 font-medium">
        No projects found. Add your first project!
      </div>
    );
  }

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute top-0 right-4 -translate-y-full mb-2">
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">Saving Order...</span>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 w-12"></th>
              <th className="p-4 font-semibold text-gray-300">Project</th>
              <th className="p-4 font-semibold text-gray-300">Tech Stack</th>
              <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={projects.map((p) => String(p._id))}
              strategy={verticalListSortingStrategy}
            >
              {projects.map((project) => (
                <SortableProjectItem key={String(project._id)} project={project} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}
