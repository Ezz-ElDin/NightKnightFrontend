import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, Loader2, Fullscreen } from "lucide-react";
import StoryText from "@/components/story-viewer/StoryText";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import EndPage from "@/components/story-viewer/EndPage";
import { StoryDetails } from "@/lib/api";
import { useFullscreen } from "@/hooks/useFullscreen";

interface DesktopStoryViewerProps {
  story: StoryDetails;
  page: number;
  setPage: (page: number) => void;
  numPages: number;
  currentPage: any;
  isEndPage: boolean;
  rtl: boolean;
  canExport: boolean;
  isExporting: boolean;
  handleExport: () => void;
  goBack: () => void;
}

const DesktopStoryViewer = ({
  story,
  page,
  setPage,
  numPages,
  currentPage,
  isEndPage,
  rtl,
  canExport,
  isExporting,
  handleExport,
  goBack
}: DesktopStoryViewerProps) => {
  const { isFullscreen, handleToggleFullscreen } = useFullscreen();

  // Touch navigation handlers
  const handleLeftTap = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleRightTap = () => {
    if (page < story.pages.length) {
      setPage(Math.min(story.pages.length, page + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[calc(100vh-4rem)] relative">
          {/* Touch Navigation Zones for touchscreen laptops */}
          <div 
            className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={handleLeftTap}
            aria-label="Previous page"
          />
          <div 
            className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={handleRightTap}
            aria-label="Next page"
          />

          {/* Story Content */}
          <div className="flex-1 flex flex-col">
            {isEndPage ? (
              <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col">
                <EndPage rtl={rtl} />
              </div>
            ) : (
              <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
                {/* Text Section - Left Side (45%) */}
                <div className="flex-none w-[45%] flex items-center justify-center p-8">
                  <StoryText
                    title={story.title}
                    text={currentPage?.text || ""}
                    page={page}
                    rtl={rtl}
                  />
                </div>
                
                {/* Visual Section - Right Side (55%) */}
                <div className="flex-1 flex items-center justify-center p-0">
                  <StoryVisual
                    coverUrl={currentPage?.image_url || ""}
                    title={story.title}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100 relative z-20">
            {/* Back Button - Left */}
            <Button
              onClick={goBack}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Back to library"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </Button>
            
            {/* Navigation Arrows - Center */}
            <div className="flex items-center gap-6">
              <Button
                onClick={handleLeftTap}
                variant="outline"
                size="lg"
                disabled={page === 0}
                aria-label="Previous Page"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <span className="text-lg font-medium text-muted-foreground px-4">
                {page + 1} / {numPages}
              </span>
              
              <Button
                onClick={handleRightTap}
                variant="outline"
                size="lg"
                disabled={page >= numPages - 1}
                aria-label="Next Page"
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Action Buttons - Right */}
            <div className="flex items-center gap-3">
              {canExport && (
                <Button
                  onClick={handleExport}
                  variant="outline"
                  disabled={isExporting}
                  className="bg-story-green hover:bg-story-green/90 border-story-green text-white flex items-center gap-2"
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Export
                </Button>
              )}
              <Button
                onClick={handleToggleFullscreen}
                variant="outline"
                className="flex items-center gap-2"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <Fullscreen className="h-4 w-4" />
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopStoryViewer;
