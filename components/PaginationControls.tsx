import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationControlsProps {
  page: number;
  totalRows: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, totalRows, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / pageSize);
  const maxPagesToShow = 5; // Total number of page links to show
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  // Calculate the range of pages to display
  let startPage = Math.max(1, page - halfMaxPages);
  let endPage = Math.min(totalPages, page + halfMaxPages);

  // Adjust start and end if there are not enough pages to display
  if (endPage - startPage < maxPagesToShow - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <Pagination className="w-full sm:w-auto">
        <PaginationContent className="flex flex-wrap items-center justify-center space-x-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(page - 1)}
              className={`cursor-pointer ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>

          {/* Render page numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <PaginationItem key={startPage + index}>
              <PaginationLink
                onClick={() => onPageChange(startPage + index)}
                isActive={page === startPage + index}
                className="cursor-pointer hover:underline"
              >
                {startPage + index}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(page + 1)}
              className={`cursor-pointer ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
