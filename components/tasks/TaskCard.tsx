"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    createdAt: string;
  };
}

export default function TaskCard({ task }: TaskCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-100">
        <div className={`h-2 ${
          task.status === "completed" 
            ? "bg-green-500" 
            : task.status === "inProgress" 
              ? "bg-blue-500" 
              : "bg-yellow-500"
        }`}></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{task.title}</h3>
            <StatusBadge status={task.status} />
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {task.description || "No description provided"}
          </p>
          <div className="text-xs text-gray-500">Created {formatDate(task.createdAt)}</div>
        </div>
      </div>
    </Link>
  );
}