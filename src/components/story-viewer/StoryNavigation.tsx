
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Fullscreen } from "lucide-react";

interface StoryNavigationProps {
  onBack: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  canPrev: boolean;
  canNext: boolean;
  page: number;
  numPages: number;
}

const StoryNavigation: React.FC<StoryNavigationProps> = ({
  onBack,
  onPrevPage,
  onNextPage,
  onToggleFullscreen,
  isFullscreen,
  canPrev,
  canNext,
  page,
  numPages,
}) => (
  <div className="flex w-full items-center justify-between px-6 py-5 bg-white border-t border-gray-100 relative min-h-[72px]">
    {/* Back Button */}
    <Button
      onClick={onBack}
      variant="outline"
      className="font-semibold px-4 flex gap-2 items-center"
      aria-label="Back to library"
    >
      <ArrowLeft className="h-5 w-5 mr-2" /> Back to Library
    </Button>
    
    {/* Centered Arrows for Page Navigation */}
    <div className="flex flex-row items-center gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <Button
        onClick={onPrevPage}
        variant="outline"
        aria-label="Previous Page"
        className="px-4"
        disabled={!canPrev}
        size="icon"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <span className="text-muted-foreground font-semibold text-lg select-none">{page + 1}</span>
      <Button
        onClick={onNextPage}
        variant="outline"
        aria-label="Next Page"
        className="px-4"
        disabled={!canNext}
        size="icon"
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
    </div>
    
    {/* Fullscreen Button */}
    <div className="absolute bottom-6 right-6">
      <Button
        onClick={onToggleFullscreen}
        variant={isFullscreen ? "secondary" : "outline"}
        size="icon"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className="rounded-full shadow border"
      >
        <Fullscreen className="h-6 w-6" />
      </Button>
    </div>
  </div>
);

export default StoryNavigation;
