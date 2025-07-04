
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, Loader2, Fullscreen } from "lucide-react";
import StoryText from "@/components/story-viewer/StoryText";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import EndPage from "@/components/story-viewer/EndPage";
import { StoryDetails } from "@/lib/api";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

interface MobileStoryViewerProps {
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
  isPortrait: boolean;
  showComingSoonDialog: boolean;
  setShowComingSoonDialog: (show: boolean) => void;
}

const MobileStoryViewer = ({
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
  goBack,
  isPortrait,
  showComingSoonDialog,
  setShowComingSoonDialog
}: MobileStoryViewerProps) => {
  const { isFullscreen, containerRef, handleToggleFullscreen } = useFullscreen();
  const { layoutType } = useResponsiveLayout();

  // Touch navigation handlers
  const handleLeftTap = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleRightTap = () => {
    if (page < story.pages.length) {
      setPage(Math.min(story.pages.length, page + 1));
    }
  };

  const isHorizontalLayout = layoutType === 'horizontal';

  return (
    <div 
      ref={containerRef} 
      className={`${isFullscreen ? 'fixed inset-0 w-screen h-screen z-50 bg-black' : 'h-screen bg-gray-50 px-4 py-4'}`}
    >
      <div className={`${isFullscreen ? 'w-full h-full' : 'max-w-5xl mx-auto h-full'} flex flex-col`}>
        <div className={`${isFullscreen ? 'w-full h-full bg-white' : 'bg-white rounded-2xl shadow-lg'} overflow-hidden flex-1 flex flex-col relative`}>
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
          <div className="flex-1 flex flex-col min-h-0">
            {isEndPage ? (
              <div className="flex-1 flex items-center justify-center">
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
                      src="/the-end-story-page.png"
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
            ) : (
              <div className={`flex flex-1 min-h-0 ${isHorizontalLayout ? 'flex-row' : 'flex-col'}`}>
                {/* Text Section */}
                <div className={`${isHorizontalLayout ? 'w-[45%] flex-none p-6' : 'flex-none h-[45%]'} flex items-center justify-center`}>
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

          {/* Mobile Navigation Bar */}
          <div className={`flex-none flex items-center justify-between px-4 py-3 border-t border-gray-100 relative z-20 ${
            isFullscreen 
              ? 'bg-black/90 backdrop-blur-sm text-white border-gray-600' 
              : 'bg-white'
          }`}>
            {/* Back Button - Left (Icon only) */}
            <Button
              onClick={goBack}
              variant="outline"
              size="icon"
              aria-label="Back to library"
              className={isFullscreen ? 'border-white/30 text-white hover:bg-white/10' : ''}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {/* Navigation Arrows - Center */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLeftTap}
                variant="outline"
                size="icon"
                disabled={page === 0}
                aria-label="Previous Page"
                className={isFullscreen ? 'border-white/30 text-white hover:bg-white/10 disabled:opacity-50 disabled:text-white/50' : ''}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <span className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-muted-foreground'}`}>
                {page + 1} / {numPages}
              </span>
              
              <Button
                onClick={handleRightTap}
                variant="outline"
                size="icon"
                disabled={page >= numPages - 1}
                aria-label="Next Page"
                className={isFullscreen ? 'border-white/30 text-white hover:bg-white/10 disabled:opacity-50 disabled:text-white/50' : ''}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {canExport && (
                <Button
                  onClick={handleExport}
                  variant="outline"
                  size="icon"
                  disabled={isExporting}
                  className={isFullscreen 
                    ? 'bg-green-600 hover:bg-green-700 border-green-600 text-white' 
                    : 'bg-story-green hover:bg-story-green/90 border-story-green text-white'
                  }
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                onClick={handleToggleFullscreen}
                variant="outline"
                size="icon"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className={isFullscreen ? 'border-white/30 text-white hover:bg-white/10' : ''}
              >
                <Fullscreen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStoryViewer;
