import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationControlsProps {
  page: number;
  totalRows: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, totalRows, pageSize, onPageChange }) => (
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
        {[...Array(Math.ceil(totalRows / pageSize))].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => onPageChange(index + 1)}
              isActive={page === index + 1}
              className="cursor-pointer hover:underline"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page + 1)}
            className={`cursor-pointer ${page >= Math.ceil(totalRows / pageSize) ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
);

export default PaginationControls;
