"use client";

export default function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    inProgress: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
  };

  const style = statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${style}`}>
      {status === "inProgress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}