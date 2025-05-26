
import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storiesApi, StoryDetails } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import StoryText from "@/components/story-viewer/StoryText";
import StoryNavigation from "@/components/story-viewer/StoryNavigation";

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const StoryViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [page, setPage] = useState(0);

  // Fetch story data via react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => storiesApi.get(storyId!),
    enabled: !!storyId // Don't fetch if param missing
  });

  // Fullscreen management
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };
  React.useEffect(() => {
    const cb = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", cb);
    return () => document.removeEventListener("fullscreenchange", cb);
  }, []);

  const goBack = () => navigate("/library");

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

  if (isError || !data) {
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

  const story: StoryDetails = data;
  const numPages = story.pages.length;

  // Each page entry in API is now one page in the book
  const currentPage = story.pages[page];
  // Use RTL if title or page text is arabic
  const rtl = currentPage && (isArabic(story.title) || isArabic(currentPage.text));

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
          {/* Left Side - Story Page Title/Text */}
          <StoryText
            title={story.title}
            text={currentPage?.text || ""}
            page={page}
            rtl={rtl}
          />

          {/* Right Side - Visual */}
          <StoryVisual
            coverUrl={currentPage?.image_url || ""}
            title={story.title}
          />
        </div>
        {/* Footer - Navigation & Fullscreen Controls */}
        <StoryNavigation
          onBack={goBack}
          onPrevPage={() => setPage(Math.max(0, page - 1))}
          onNextPage={() => setPage(Math.min(numPages - 1, page + 1))}
          onToggleFullscreen={handleToggleFullscreen}
          isFullscreen={isFullscreen}
          canPrev={page > 0}
          canNext={page < numPages - 1}
          page={page}
          numPages={numPages}
        />
      </div>
    </div>
  );
};

export default StoryViewer;
