
import React from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import StoryVisual from './StoryVisual';
import StoryText from './StoryText';
import StoryNavigation from './StoryNavigation';
import EndPage from './EndPage';
import { useFullscreen } from '@/hooks/useFullscreen';
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
        {/* Book Content */}
        <div
          className={clsx(
            `
            flex
            flex-col
            md:flex-row
            w-full
            md:divide-x
            divide-y
            md:divide-y-0
            divide-gray-200
            flex-1
            `
          )}
        >
          {/* Left Side - Story Page Title/Text - 45% */}
          <div className="md:w-[45%] flex-none">
            {isEndPage ? (
              <EndPage rtl={rtl} />
            ) : (
              <StoryText
                title={story.title}
                text={currentPage?.text || ""}
                page={page}
                rtl={rtl}
              />
            )}
          </div>
          {/* Right Side - Visual - 55% */}
          <div className="md:w-[55%] flex-none">
            {isEndPage ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center">
                <div className="text-8xl md:text-9xl opacity-20">
                  📚
                </div>
              </div>
            ) : (
              <StoryVisual
                coverUrl={currentPage?.image_url || ""}
                title={story.title}
              />
            )}
          </div>
        </div>
        {/* Footer - Navigation & Fullscreen Controls */}
        <div className="relative">
          <StoryNavigation
            onBack={goBack}
            onPrevPage={() => setPage(Math.max(0, page - 1))}
            onNextPage={() => setPage(Math.min(numPages - 1, page + 1))}
            onToggleFullscreen={handleToggleFullscreen}
            onExport={handleExport}
            isFullscreen={isFullscreen}
            canPrev={page > 0}
            canNext={page < numPages - 1}
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
