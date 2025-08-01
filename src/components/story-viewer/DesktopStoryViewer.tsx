
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import StoryNavigation from './StoryNavigation';
import SynchronizedStoryPage from './SynchronizedStoryPage';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { StoryDetails } from '@/lib/api';

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

const DesktopStoryViewer: React.FC<DesktopStoryViewerProps> = ({
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
}) => {
  const { isFullscreen, containerRef, handleToggleFullscreen } = useFullscreen();
  const { preloadImages } = useImagePreloader();

  // Preload adjacent images when page changes
  useEffect(() => {
    if (!story?.pages) return;

    const imagesToPreload: string[] = [];
    
    // Preload current page image
    if (currentPage?.image_url) {
      imagesToPreload.push(currentPage.image_url);
    }
    
    // Preload next page image
    if (page < story.pages.length - 1) {
      const nextPage = story.pages[page + 1];
      if (nextPage?.image_url) {
        imagesToPreload.push(nextPage.image_url);
      }
    }
    
    // Preload previous page image
    if (page > 0) {
      const prevPage = story.pages[page - 1];
      if (prevPage?.image_url) {
        imagesToPreload.push(prevPage.image_url);
      }
    }

    if (imagesToPreload.length > 0) {
      preloadImages(imagesToPreload);
    }
  }, [page, story?.pages, currentPage, preloadImages]);

  return (
    <div 
      className={clsx(
        "w-full min-h-screen flex flex-col items-center justify-center px-1 py-4 bg-white"
      )}
      style={{ minHeight: "100vh" }}
    >
      <div
        ref={containerRef}
        className={clsx(
          `
          relative
          w-full
          max-w-5xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-2xl
          p-0
          overflow-hidden
          flex
          flex-col
          border
          border-solid
          border-gray-200
          duration-200
          transition-all
          animate-fade-in
          `,
          isFullscreen ? "max-w-none w-screen min-h-screen h-screen !rounded-none" : "min-h-[70vh]"
        )}
        style={{
          boxShadow: "0 10px 40px 2px rgba(80,60,120,0.13)",
        }}
      >
        {/* Synchronized Story Content */}
        <SynchronizedStoryPage
          title={story.title}
          text={currentPage?.text || ""}
          imageUrl={currentPage?.image_url || ""}
          page={page}
          rtl={rtl}
          isEndPage={isEndPage}
        />

        {/* Footer - Navigation & Fullscreen Controls */}
        <div className="relative">
          <StoryNavigation
            onBack={goBack}
            onPrevPage={() => setPage(Math.max(0, page - 1))}
            onNextPage={() => setPage(Math.min(story.pages.length, page + 1))}
            onToggleFullscreen={handleToggleFullscreen}
            onExport={handleExport}
            isFullscreen={isFullscreen}
            canPrev={page > 0}
            canNext={page < story.pages.length}
            canExport={canExport}
            isExporting={isExporting}
            page={page}
            numPages={numPages}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopStoryViewer;
