
import React from "react";
import { Button } from "@/components/ui/button";
import MobileStoryViewer from "@/components/story-viewer/MobileStoryViewer";
import DesktopStoryViewer from "@/components/story-viewer/DesktopStoryViewer";
import TabletStoryViewer from "@/components/story-viewer/TabletStoryViewer";
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
    deviceInfo,
    
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

  // Render appropriate viewer based on device type
  if (deviceInfo.deviceType === 'mobile') {
    return (
      <>
        <MobileStoryViewer
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
          isPortrait={deviceInfo.isPortrait}
          showComingSoonDialog={showComingSoonDialog}
          setShowComingSoonDialog={setShowComingSoonDialog}
        />

        <ComingSoonDialog
          open={showComingSoonDialog}
          onOpenChange={setShowComingSoonDialog}
        />
      </>
    );
  }

  if (deviceInfo.deviceType === 'tablet') {
    return (
      <>
        <TabletStoryViewer
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
          isPortrait={deviceInfo.isPortrait}
        />

        <ComingSoonDialog
          open={showComingSoonDialog}
          onOpenChange={setShowComingSoonDialog}
        />
      </>
    );
  }

  // Desktop viewer
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
