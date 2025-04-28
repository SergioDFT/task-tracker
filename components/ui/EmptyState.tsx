"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

interface EmptyStateProps {
  openCreateModal: () => void;
}

export default function EmptyState({ openCreateModal }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new task</p>
      <div className="mt-6">
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          New Task
        </button>
      </div>
    </div>
  );
}