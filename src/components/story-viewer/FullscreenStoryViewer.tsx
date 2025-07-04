
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import StoryText from "@/components/story-viewer/StoryText";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import EndPage from "@/components/story-viewer/EndPage";
import { StoryDetails } from "@/lib/api";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { createPortal } from "react-dom";

interface FullscreenStoryViewerProps {
  story: StoryDetails;
  page: number;
  setPage: (page: number) => void;
  numPages: number;
  currentPage: any;
  isEndPage: boolean;
  rtl: boolean;
  onExitFullscreen: () => void;
}

const FullscreenStoryViewer = ({
  story,
  page,
  setPage,
  numPages,
  currentPage,
  isEndPage,
  rtl,
  onExitFullscreen
}: FullscreenStoryViewerProps) => {
  const { layoutType } = useResponsiveLayout();
  const [showControls, setShowControls] = useState(true);
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

  // Touch navigation handlers
  const handleLeftTap = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleRightTap = () => {
    if (page < story.pages.length) {
      setPage(Math.min(story.pages.length, page + 1));
    }
  };

  // Auto-hide controls after mouse inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setMouseTimer(timer);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseMove);
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
    };
  }, [mouseTimer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleLeftTap();
      } else if (e.key === "ArrowRight") {
        handleRightTap();
      } else if (e.key === "Escape") {
        onExitFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [page, story, onExitFullscreen]);

  const isHorizontalLayout = layoutType === 'horizontal';

  const fullscreenContent = (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col">
      {/* Touch Navigation Zones */}
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
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {isEndPage ? (
          <div className="flex-1 flex items-center justify-center">
            <EndPage rtl={rtl} />
          </div>
        ) : (
          <div className={`flex flex-1 min-h-0 ${isHorizontalLayout ? 'flex-row' : 'flex-col'}`}>
            {/* Text Section */}
            <div className={`${isHorizontalLayout ? 'w-[50%] flex-none' : 'flex-none h-[50%]'} flex items-center justify-center p-8`}>
              <StoryText
                title={story.title}
                text={currentPage?.text || ""}
                page={page}
                rtl={rtl}
              />
            </div>
            
            {/* Visual Section */}
            <div className={`${isHorizontalLayout ? 'flex-1' : 'flex-1'} flex items-center justify-center p-0`}>
              <StoryVisual
                coverUrl={currentPage?.image_url || ""}
                title={story.title}
              />
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Controls - Auto-hiding */}
      <div 
        className={`absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4">
          {/* Exit Fullscreen Button */}
          <Button
            onClick={onExitFullscreen}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            aria-label="Exit fullscreen"
          >
            <X className="h-6 w-6" />
          </Button>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-6">
            <Button
              onClick={handleLeftTap}
              variant="ghost"
              size="icon"
              disabled={page === 0}
              className="text-white hover:bg-white/20 disabled:opacity-30"
              aria-label="Previous Page"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <span className="text-white font-medium text-lg">
              {page + 1} / {numPages}
            </span>
            
            <Button
              onClick={handleRightTap}
              variant="ghost"
              size="icon"
              disabled={page >= numPages - 1}
              className="text-white hover:bg-white/20 disabled:opacity-30"
              aria-label="Next Page"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Spacer for symmetry */}
          <div className="w-10" />
        </div>
      </div>
    </div>
  );

  return createPortal(fullscreenContent, document.body);
};

export default FullscreenStoryViewer;
