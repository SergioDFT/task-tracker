"use client";

import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

interface TaskSearchHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  openCreateModal: () => void;
}

export default function TaskSearchHeader({ search, onSearchChange, openCreateModal }: TaskSearchHeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            <button
              onClick={openCreateModal}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              New Task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}