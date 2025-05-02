"use client";

import { useState } from "react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create task");

      setFormData({ title: "", description: "", status: "pending" });
      onClose();
      onTaskCreated();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
    <div
      className="absolute inset-0 bg-white/10 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    ></div>

        <div className="relative bg-gray-800 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-700 animate-fadeIn">
          <div className="px-6 pt-6 pb-6">
            <h3 className="text-xl font-medium leading-6 text-white mb-6 border-b border-gray-700 pb-4">Create New Task</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Enter task title"
                  className="block w-full rounded-lg bg-gray-700 border-gray-600 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm placeholder-gray-400"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Describe your task here..."
                  className="block w-full rounded-lg bg-gray-700 border-gray-600 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm resize-none placeholder-gray-400"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="mb-8">
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    className="block appearance-none w-full rounded-lg bg-gray-700 border-gray-600 text-white px-4 py-3 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm cursor-pointer"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700 sm:grid sm:grid-cols-2 sm:gap-4 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center rounded-lg border border-gray-600 shadow-sm px-5 py-2.5 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-300 sm:col-start-1 sm:text-sm mt-3 sm:mt-0"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-5 py-2.5 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-300 sm:col-start-2 sm:text-sm"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}