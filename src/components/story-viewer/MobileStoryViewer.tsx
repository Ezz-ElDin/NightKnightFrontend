
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Maximize } from "lucide-react";
import { useStoryViewer } from "@/hooks/useStoryViewer";
import StoryPage from "./StoryPage";
import EndPage from "./EndPage";

const MobileStoryViewer = () => {
  const {
    page,
    setPage,
    story,
    isLoading,
    isError,
    numPages,
    currentPage,
    isEndPage,
    rtl,
    goBack
  } = useStoryViewer();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-primary mb-2">Loading Story...</h1>
        <p className="text-muted-foreground text-center">
          Hold tight, preparing your adventure.
        </p>
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-primary mb-2">Story Not Found</h1>
        <p className="text-muted-foreground text-center mb-6">
          Sorry, we couldn't find that story.
        </p>
        <Button onClick={goBack} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const canPrev = page > 0;
  const canNext = page < numPages - 1;

  const handlePrevPage = () => {
    if (canPrev) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (canNext) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Button onClick={goBack} variant="ghost" size="sm" className="text-gray-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <span className="text-sm text-gray-600 font-medium">
          {page + 1} / {numPages}
        </span>
        <Button
          onClick={toggleFullscreen}
          variant="ghost"
          size="sm"
          className="text-gray-600"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Story Content */}
      <div className="flex-1 flex flex-col">
        {page === 0 ? (
          // Title page
          <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-white">
            <div className="flex-1 flex items-center justify-center p-8">
              <h1 className="text-3xl font-bold text-center text-gray-800 leading-tight">
                {story.story_title || story.title}
              </h1>
            </div>
          </div>
        ) : isEndPage ? (
          <EndPage />
        ) : currentPage ? (
          <StoryPage
            content={currentPage.text}
            image={currentPage.image}
            pageNumber={page}
            totalPages={numPages}
            pageId={currentPage.id || `page-${page}`}
            rating={null}
            onRate={() => {}}
            isRtl={rtl}
            showRating={false}
          />
        ) : null}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between p-4 bg-white border-t border-gray-100">
        <Button
          onClick={handlePrevPage}
          variant="outline"
          size="sm"
          disabled={!canPrev}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNextPage}
          variant="outline"
          size="sm"
          disabled={!canNext}
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileStoryViewer;
