/**
 * Pagination Component - Reusable component to display page controls.
 * This component accepts three props: currentPage, totalPages, and onPageChange callback function. 
 * It renders "Previous" and "Next" buttons and numbered page buttons similar to the implementation in AllOrders.tsx.
 */

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showAlways?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, showAlways = false }) => {
  if (!showAlways && totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
