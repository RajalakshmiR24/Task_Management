// src/components/Pagination.js

import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="p-2 rounded-md shadow-md hover:bg-gray-100"
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-white shadow-md hover:bg-gray-100'}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="p-2 rounded-md shadow-md hover:bg-gray-100"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
