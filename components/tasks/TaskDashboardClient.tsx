"use client";

import { useState } from "react";
import TaskSearchHeader from "./TaskSearchHeader";
import TaskList from "./TaskList";
import CreateTaskModal from "./CreateTaskModal";

export default function TaskDashboardClient() {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

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
        onTaskCreated={() => {
          // This will cause TaskList to refresh due to the search dependency
          setSearch(prev => prev + " ");
          setTimeout(() => setSearch(prev => prev.trim()), 100);
        }} 
      />
    </div>
  );
}