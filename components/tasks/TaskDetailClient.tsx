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

            router.push("/dashboard");
        } catch (error) {
            console.error("Error deleting task:", error);
            setShowDeleteModal(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Back to Dashboard
                </Link>

                <h2 className="text-2xl font-bold mb-6">Edit Task</h2>

                <form onSubmit={handleUpdateTask}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </Link>

                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">{currentTask.title}</h1>
                        <StatusBadge status={currentTask.status} />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-sm font-medium text-gray-500 mb-2">Description</h2>
                        <p className="text-gray-800 whitespace-pre-line">
                            {currentTask.description || "No description provided"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                        <div>
                            <h2 className="font-medium text-gray-500">Created</h2>
                            <p className="text-gray-800">{formatDate(currentTask.createdAt)}</p>
                        </div>
                        <div>
                            <h2 className="font-medium text-gray-500">Last Modified</h2>
                            <p className="text-gray-800">{formatDate(currentTask.updatedAt)}</p>
                        </div>
                    </div>

                    <div className="flex space-x-4 justify-end">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </>
    );
}

