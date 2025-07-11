
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import clsx from 'clsx';
import StoryVisual from './StoryVisual';
import StoryText from './StoryText';
import EndPage from './EndPage';

interface DesktopDiscoverStoryViewerProps {
  story: any;
  page: number;
  setPage: (page: number) => void;
  numPages: number;
  currentPage: any;
  canPrev: boolean;
  canNext: boolean;
  onClose: () => void;
}

const DesktopDiscoverStoryViewer: React.FC<DesktopDiscoverStoryViewerProps> = ({
  story,
  page,
  setPage,
  numPages,
  currentPage,
  canPrev,
  canNext,
  onClose
}) => {
  const handlePrevPage = () => {
    if (canPrev) {
      setPage(Math.max(1, page - 1));
    }
  };

  const handleNextPage = () => {
    if (canNext) {
      setPage(Math.min(numPages, page + 1));
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && canPrev) {
        handlePrevPage();
      } else if (event.key === 'ArrowRight' && canNext) {
        handleNextPage();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canPrev, canNext, onClose]);

  const isEndPage = page === numPages;
  
  // Check if the story language is Arabic for RTL support
  const isArabic = story.language === 'Arabic';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div
        className={clsx(
          "relative w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 duration-200 transition-all animate-fade-in min-h-[70vh]"
        )}
        style={{
          boxShadow: "0 10px 40px 2px rgba(80,60,120,0.13)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Story Content */}
        {isEndPage ? (
          // End Page
          <EndPage rtl={isArabic} />
        ) : (
          // Story Pages (including cover as page 1)
          <div className="flex flex-col md:flex-row w-full md:divide-x divide-y md:divide-y-0 divide-gray-200 flex-1">
            {/* Left Side - Story Page Text - 45% */}
            <div className="md:w-[45%] flex-none">
              <StoryText
                title={story.title}
                text={page === 1 ? story.coverText || story.title : currentPage?.text || ""}
                page={page === 1 ? 0 : page - 1} // Show as title page for page 1
                rtl={isArabic}
              />
            </div>
            {/* Right Side - Visual - 55% */}
            <div className="md:w-[55%] flex-none">
              <StoryVisual
                coverUrl={page === 1 ? story.coverUrl : (currentPage?.image || currentPage?.image_url || "")}
                title={story.title}
              />
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="flex w-full items-center justify-between px-6 py-5 bg-white border-t border-gray-100 relative min-h-[72px]">
          {/* Centered Navigation */}
          <div className="flex flex-row items-center gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              onClick={handlePrevPage}
              variant="outline"
              aria-label="Previous Page"
              className="px-4"
              disabled={!canPrev}
              size="icon"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <span className="text-muted-foreground font-semibold text-lg select-none">
              {page} of {numPages}
            </span>
            <Button
              onClick={handleNextPage}
              variant="outline"
              aria-label="Next Page"
              className="px-4"
              disabled={!canNext}
              size="icon"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDiscoverStoryViewer;
