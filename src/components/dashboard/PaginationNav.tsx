
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationNavProps {
  totalPages: number;
  page: number;
  goToPage: (p: number) => void;
}

const PaginationNav = ({ totalPages, page, goToPage }: PaginationNavProps) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <Button
              key={pageNumber}
              size="sm"
              variant={page === pageNumber ? "default" : "outline"}
              className="w-10 h-10"
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>
      
      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationNav;
