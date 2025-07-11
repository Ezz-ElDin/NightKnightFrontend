
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import StoryText from '@/components/story-viewer/StoryText';
import StoryVisual from '@/components/story-viewer/StoryVisual';
import EndPage from '@/components/story-viewer/EndPage';

interface MobileDiscoverStoryViewerProps {
  story: any;
  onClose: () => void;
}

const MobileDiscoverStoryViewer: React.FC<MobileDiscoverStoryViewerProps> = ({
  story,
  onClose
}) => {
  const [page, setPage] = useState(1); // Start from page 1 (cover page)
  
  if (!story) return null;

  // Total pages: cover page (1) + story pages (2 to n+1) + end page
  const numPages = story.pages ? story.pages.length + 2 : 2; // +1 for cover, +1 for end
  const isEndPage = page === numPages;
  const isCoverPage = page === 1;
  
  // For story pages (page 2+), get the corresponding page from story.pages array
  const currentPage = !isCoverPage && !isEndPage ? story.pages[page - 2] : null;
  
  // Check if the story language is Arabic for RTL support
  const isArabic = story.language === 'Arabic';

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(numPages, page + 1));
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, numPages, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="min-h-screen bg-gray-50 px-4 py-0 w-full">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-none shadow-lg overflow-hidden min-h-screen">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>

            {/* Story Content */}
            <div className="flex-1 flex flex-col">
              {isEndPage ? (
                <div className="w-full min-h-screen flex flex-col">
                  {/* Full height image */}
                  <div className="w-full flex-1">
                    <div className="w-full h-full bg-[#fafafd] flex items-center justify-center p-0 m-0">
                      <div
                        className="relative w-full h-full flex items-center justify-center"
                        style={{
                          background: "#e8eafd",
                          borderRadius: "0",
                          overflow: "hidden",
                          boxShadow: "0 4px 32px 3px rgba(100,100,115,0.10)",
                        }}
                      >
                        <img
                          src="/images/the-end-story-page.png"
                          alt="The End"
                          className="w-full h-full object-cover"
                          style={{
                            objectFit: "cover",
                            borderRadius: "0",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Text Section - Top */}
                  <div className="w-full">
                    <StoryText
                      title={story.title}
                      text={isCoverPage ? story.title : (currentPage?.text || "")}
                      page={isCoverPage ? 0 : page - 1} // Show as title page for cover
                      rtl={isArabic}
                    />
                  </div>
                  
                  {/* Visual Section - Bottom */}
                  <div className="w-full">
                    <StoryVisual
                      coverUrl={isCoverPage ? story.coverUrl : (currentPage?.image || currentPage?.image_url || "")}
                      title={story.title}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Mobile Navigation Bar */}
            <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-gray-100">
              {/* Back Button - Left */}
              <Button
                onClick={onClose}
                variant="outline"
                className="flex items-center gap-2"
                aria-label="Close story"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              {/* Navigation Arrows - Center */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePrevPage}
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  aria-label="Previous Page"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm font-medium text-muted-foreground">
                  {page} / {numPages}
                </span>
                
                <Button
                  onClick={handleNextPage}
                  variant="outline"
                  size="icon"
                  disabled={page >= numPages}
                  aria-label="Next Page"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Empty space for symmetry */}
              <div className="w-[72px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDiscoverStoryViewer;
