import TaskDetailClient from "@/components/tasks/TaskDetailClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import prisma from "@/lib/prisma"; // ← You need a prisma.ts inside lib/

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      return { title: "Task Not Found" };
    }

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
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      notFound();
    }

    const taskFromDb = await prisma.task.findFirst({
      where: {
        id: id, 
        user: {
          clerkUserId: userId, 
        },
      },
    });
    
    if (!taskFromDb ) {
      notFound();
    }

    const task = {
      id: taskFromDb.id,
      title: taskFromDb.title,
      description: taskFromDb.description ?? undefined,
      status: taskFromDb.status,
      createdAt: taskFromDb.createdAt.toISOString(), 
      updatedAt: taskFromDb.updatedAt.toISOString(), 
    };

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
