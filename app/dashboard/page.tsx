import { Suspense } from "react";
import TaskDashboardClient from "@/components/tasks/TaskDashboardClient";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const metadata = {
  title: "Task Dashboard",
  description: "Manage your tasks efficiently",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TaskDashboardClient />
    </Suspense>
  );
}