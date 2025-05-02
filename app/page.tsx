import { Suspense } from "react";
import TaskDashboardClient from "@/components/tasks/TaskDashboardClient";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { LandingPage } from "@/components/landing/LandingPage";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Task Tracker",
  description: "Manage your tasks efficiently",
};

export default async function Home() {
  const user = await getCurrentUser({withFullUser: false});
  return (
    <>
    <Header />
      { user?.id ? (
        <Suspense fallback={<LoadingSpinner />}>
          <TaskDashboardClient />
        </Suspense>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
