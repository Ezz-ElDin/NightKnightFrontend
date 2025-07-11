
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useDiscoverStoryViewer = (story: any) => {
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();
  
  if (!story) {
    return {
      page: 0,
      setPage: () => {},
      numPages: 0,
      currentPage: null,
      isEndPage: false,
      isMobile: false,
      canPrev: false,
      canNext: false,
    };
  }

  // Total pages: title page (0) + story pages (1 to n) + end page
  const numPages = story.pages ? story.pages.length + 1 : 1; // +1 for title page
  const isEndPage = page >= numPages - 1;
  const currentPage = page === 0 ? null : story.pages[page - 1]; // page 0 is title, page 1+ are story pages
  
  const canPrev = page > 0;
  const canNext = page < numPages - 1;

  return {
    page,
    setPage,
    numPages,
    currentPage,
    isEndPage,
    isMobile,
    canPrev,
    canNext,
  };
};
