'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl: string;
}

const Pagination = ({ currentPage, totalItems, itemsPerPage, baseUrl }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;
  
  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <div className="pagination-content">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link 
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="pagination-btn pagination-btn-prev"
          >
            <ChevronLeft size={16} />
            Əvvəlki
          </Link>
        ) : (
          <span className="pagination-btn pagination-btn-disabled">
            <ChevronLeft size={16} />
            Əvvəlki
          </span>
        )}

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {pageNumbers.map((pageNum) => (
            pageNum === currentPage ? (
              <span key={pageNum} className="pagination-number pagination-number-active">
                {pageNum}
              </span>
            ) : (
              <Link
                key={pageNum}
                href={`${baseUrl}?page=${pageNum}`}
                className="pagination-number"
              >
                {pageNum}
              </Link>
            )
          ))}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link 
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="pagination-btn pagination-btn-next"
          >
            Növbəti
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span className="pagination-btn pagination-btn-disabled">
            Növbəti
            <ChevronRight size={16} />
          </span>
        )}
      </div>
      
      {/* Page Info */}
      <div className="pagination-info">
        Səhifə {currentPage} / {totalPages} (Ümumi: {totalItems} xəbər)
      </div>
    </div>
  );
};

export default Pagination;

