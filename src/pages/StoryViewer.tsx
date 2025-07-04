
import React from "react";
import { Button } from "@/components/ui/button";
import MobileStoryViewer from "@/components/story-viewer/MobileStoryViewer";
import DesktopStoryViewer from "@/components/story-viewer/DesktopStoryViewer";
import ComingSoonDialog from "@/components/story-viewer/ComingSoonDialog";
import { useStoryViewer } from "@/hooks/useStoryViewer";

const StoryViewer = () => {
  const {
    // State
    page,
    setPage,
    showComingSoonDialog,
    setShowComingSoonDialog,
    isExporting,
    isMobile,
    
    // Data
    story,
    isLoading,
    isError,
    numPages,
    currentPage,
    isEndPage,
    rtl,
    canExport,
    
    // Actions
    handleExport,
    goBack
  } = useStoryViewer();

  // Render mobile version if on mobile
  if (isMobile) {
    return <MobileStoryViewer />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-primary mb-2">Loading Story...</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Hold tight, preparing your adventure.
        </p>
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-primary mb-2">Story Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Sorry, we couldn't find that story.
        </p>
        <Button onClick={goBack} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <>
      <DesktopStoryViewer
        story={story}
        page={page}
        setPage={setPage}
        numPages={numPages}
        currentPage={currentPage}
        isEndPage={isEndPage}
        rtl={rtl}
        canExport={canExport}
        isExporting={isExporting}
        handleExport={handleExport}
        goBack={goBack}
      />

      <ComingSoonDialog
        open={showComingSoonDialog}
        onOpenChange={setShowComingSoonDialog}
      />
    </>
  );
};

export default StoryViewer;
