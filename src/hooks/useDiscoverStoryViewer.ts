
import { useState, useEffect } from 'react';

export const useDiscoverStoryViewer = (story: any) => {
  const [page, setPage] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPage(prev => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        if (story && page < story.pages.length) {
          setPage(prev => Math.min(story.pages.length, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [story, page]);

  // Reset page when story changes
  useEffect(() => {
    setPage(0);
  }, [story?.id]);

  // Computed values
  const numPages = story ? story.pages.length + 1 : 0; // +1 for title page
  const currentPage = story && page > 0 && page <= story.pages.length ? story.pages[page - 1] : null;
  const isEndPage = story && page === story.pages.length;
  const isTitlePage = page === 0;

  return {
    page,
    setPage,
    numPages,
    currentPage,
    isEndPage,
    isTitlePage
  };
};
