import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 mt-4">
      <button
        className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 text-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {generatePageNumbers().map((num) => (
        <button
          key={num}
          className={`px-3 py-1 rounded border text-sm ${
            num === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 text-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
