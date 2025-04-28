import TaskDetailClient from "@/components/tasks/TaskDetailClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { title: "Task Not Found" };
    }

    const task = await response.json();

    return {
      title: `Task: ${task.title}`,
      description: task.description || "View task details",
    };
  } catch (err) {
    console.error(err);
    return {
      title: "Task Details",
      description: "View and manage your task",
    };
  }
}

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch task: ${response.statusText}`);
    }

    const task = await response.json();

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <TaskDetailClient task={task} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error in TaskDetailPage:", error);

    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          <h2 className="text-lg font-medium">Error loading task</h2>
          <p>There was a problem loading this task. Please try again later.</p>
        </div>
      </div>
    );
  }
}