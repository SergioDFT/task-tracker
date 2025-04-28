"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow-sm isolate">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`relative px-4 py-2 text-sm font-medium rounded-l-md border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative px-4 py-2 text-sm font-medium border-t border-b ${
              currentPage === page
                ? 'bg-blue-50 text-blue-600 border-blue-500 z-10'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`relative px-4 py-2 text-sm font-medium rounded-r-md border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Next
        </button>
      </nav>
    </div>
  );
}