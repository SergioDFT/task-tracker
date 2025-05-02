"use client";

import { useEffect, useState } from "react";
import TaskSearchHeader from "./TaskSearchHeader";
import TaskList from "./TaskList";
import CreateTaskModal from "./CreateTaskModal";
import { getCurrentUserClient } from "@/auth/nextjs/currentUserClient";
import type { User } from "@prisma/client";

export default function TaskDashboardClient() {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUserClient();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  const handleTaskCreated = () => {
    setSearch((prev) => prev + " ");
    setTimeout(() => setSearch((prev) => prev.trim()), 100);
  };

  const handleSearchChange = (value: string) => setSearch(value);

  if (!user) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TaskSearchHeader
        search={search}
        onSearchChange={handleSearchChange}
        openCreateModal={() => setShowCreateModal(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskList
          openCreateModal={() => setShowCreateModal(true)}
          search={search}
        />
      </main>

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}
