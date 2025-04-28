"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StatusBadge from "@/components/tasks/StatusBadge";
import DeleteConfirmationModal from "@/components/tasks/DeleteConfirmationModal";

type Task = {
    id: string;
    title: string;
    description?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export default function TaskDetailClient({ task }: { task: Task }) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(task);
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description || "",
        status: task.status,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update task");

            const updatedTask = await response.json();
            setCurrentTask(updatedTask);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTask = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete task");

            router.push("/");
        } catch (error) {
            console.error("Error deleting task:", error);
            setShowDeleteModal(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 px-10">
                <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-xl overflow-hidden p-8 border border-gray-700">
                    <a
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center text-sm hover:text-indigo-300 mb-6 transition-colors duration-300"

                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Task Description
                    </a>
                    <h2 className="text-2xl font-bold mb-8 text-white border-b border-gray-700 pb-4">Edit Task</h2>

                    <form onSubmit={handleUpdateTask}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="block w-full rounded-lg bg-gray-700 border-gray-600 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm placeholder-gray-400"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter task title"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className="block w-full rounded-lg bg-gray-700 border-gray-600 text-white px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm resize-none placeholder-gray-400"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your task here..."
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

                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-300"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-70"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 px-10">
                <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-xl overflow-hidden p-8 border border-gray-700">
                    <div className="p-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm hover:text-indigo-300 mb-6 transition-colors duration-300"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Back to Dashboard
                        </Link>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center border-b border-gray-700 mb-8 pb-4 gap-4">
                            <h2 className="text-2xl font-bold text-white sm:col-span-3">
                                {currentTask.title}
                            </h2>
                            <div className="sm:col-span-1 sm:justify-self-end">
                                <StatusBadge status={currentTask.status} />
                            </div>
                        </div>




                        <div className="mb-8">
                            <h2 className="text-sm font-medium text-gray-300 mb-2">Description</h2>
                            <p className="text-white whitespace-pre-line">
                                {currentTask.description || "No description provided"}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                            <div>
                                <h2 className="font-medium text-gray-300">Created</h2>
                                <p className="text-white">{formatDate(currentTask.createdAt)}</p>
                            </div>
                            <div>
                                <h2 className="font-medium text-gray-300">Last Modified</h2>
                                <p className="text-white">{formatDate(currentTask.updatedAt)}</p>
                            </div>
                        </div>

                        <div className="flex space-x-4 justify-end">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center px-3 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-300"
                            >
                                <PencilIcon className="h-4 w-4 mr-1" />
                                Edit
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <TrashIcon className="h-4 w-4 mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteTask}
                />
            </div>
        </>
    );
}

