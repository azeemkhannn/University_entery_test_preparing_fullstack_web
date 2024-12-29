import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function QuizPagination({ currentPage, totalPages, onPageChange }: QuizPaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Previous
      </button>
      
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-5 w-5 ml-1" />
      </button>
    </div>
  );
}