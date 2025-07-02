
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Fullscreen, Download, Loader2 } from "lucide-react";

interface StoryNavigationProps {
  onBack: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onToggleFullscreen: () => void;
  onExport: () => void;
  isFullscreen: boolean;
  canPrev: boolean;
  canNext: boolean;
  canExport: boolean;
  isExporting?: boolean;
  page: number;
  numPages: number;
}

const StoryNavigation: React.FC<StoryNavigationProps> = ({
  onBack,
  onPrevPage,
  onNextPage,
  onToggleFullscreen,
  onExport,
  isFullscreen,
  canPrev,
  canNext,
  canExport,
  isExporting = false,
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
    
    {/* Action Buttons - Export and Fullscreen */}
    <div className="absolute bottom-6 right-6 flex gap-3">
      {canExport && (
        <Button
          onClick={onExport}
          variant="outline"
          size="icon"
          aria-label="Export story"
          disabled={isExporting}
          className="rounded-full shadow border transition-transform duration-200 hover:scale-105 bg-story-green hover:bg-story-green/90 border-story-green text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isExporting ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Download className="h-6 w-6" />
          )}
        </Button>
      )}
      <Button
        onClick={onToggleFullscreen}
        variant={isFullscreen ? "secondary" : "outline"}
        size="icon"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className="rounded-full shadow border transition-transform duration-200 hover:scale-105"
      >
        <Fullscreen className="h-6 w-6" />
      </Button>
    </div>
  </div>
);

export default StoryNavigation;
