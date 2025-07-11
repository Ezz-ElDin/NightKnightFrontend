
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useDiscoverStoryViewer = (story: any) => {
  const [page, setPage] = useState(1); // Start from page 1 instead of 0
  const isMobile = useIsMobile();
  
  if (!story) {
    return {
      page: 1,
      setPage: () => {},
      numPages: 0,
      currentPage: null,
      isEndPage: false,
      isMobile: false,
      canPrev: false,
      canNext: false,
    };
  }

  // Total pages: cover page (1) + story pages (2 to n) + end page
  const numPages = story.pages ? story.pages.length + 1 : 1; // +1 for cover page
  const isEndPage = page >= numPages;
  const currentPage = page === 1 ? null : story.pages[page - 2]; // page 1 is cover, page 2+ are story pages
  
  const canPrev = page > 1;
  const canNext = page < numPages;

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
