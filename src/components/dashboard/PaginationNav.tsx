
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface PaginationNavProps {
  totalPages: number;
  page: number;
  goToPage: (p: number) => void;
}

const PaginationNav = ({ totalPages, page, goToPage }: PaginationNavProps) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(Math.max(1, page - 1))}
              className={page === 1 ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, idx) => (
            <PaginationItem key={idx}>
              <Button
                size="sm"
                variant={page === idx + 1 ? "default" : "outline"}
                className="rounded-full w-10 h-10 flex items-center justify-center"
                onClick={() => goToPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(Math.min(totalPages, page + 1))}
              className={page === totalPages ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationNav;
