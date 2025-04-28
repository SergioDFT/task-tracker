import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import TaskDashboardClient from "@/components/tasks/TaskDashboardClient";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata = {
  title: "Task Dashboard",
  description: "Manage your tasks efficiently",
};

export default async function Home() {
  const { userId } = await auth();
  return (
    <>
      {userId ? (
        <Suspense fallback={<LoadingSpinner />}>
          <TaskDashboardClient />
        </Suspense>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
