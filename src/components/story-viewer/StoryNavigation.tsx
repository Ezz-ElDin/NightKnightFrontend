
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Fullscreen, Download, Loader2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  <div className="flex w-full items-center justify-between px-4 py-4 bg-white border-t border-gray-100 relative min-h-[64px]">
    {/* Back Button - Left */}
    <Button
      onClick={onBack}
      variant="outline"
      className="font-semibold px-3 py-2 flex gap-2 items-center text-sm"
      aria-label="Back to library"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Library</span>
    </Button>
    
    {/* Centered Navigation Arrows */}
    <div className="flex flex-row items-center gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Button
        onClick={onPrevPage}
        variant="outline"
        aria-label="Previous Page"
        disabled={!canPrev}
        size="icon"
        className="h-9 w-9"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <span className="text-muted-foreground font-semibold text-base select-none px-2">
        {page + 1}
      </span>
      <Button
        onClick={onNextPage}
        variant="outline"
        aria-label="Next Page"
        disabled={!canNext}
        size="icon"
        className="h-9 w-9"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
    
    {/* Three-dot Menu - Right */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {canExport && (
          <DropdownMenuItem onClick={onExport} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export Story
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onToggleFullscreen}>
          <Fullscreen className="h-4 w-4 mr-2" />
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default StoryNavigation;
