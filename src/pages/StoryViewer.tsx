import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Fullscreen } from "lucide-react";
import clsx from "clsx";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import StoryText from "@/components/story-viewer/StoryText";
import StoryNavigation from "@/components/story-viewer/StoryNavigation";

const MOCK_STORIES = [
  {
    id: 1,
    title: "القطة الشجاعة والقمر",
    coverUrl: "/images/moon-kittens.png",
    createdAt: "2024-05-24T22:00:00Z",
    text: "في ليلة مقمرة، قررت القطة الشجاعة أن تسافر إلى القمر لتجلب النور لكل القطط.",
  },
  {
    id: 2,
    title: "The Lost Pirate Hat",
    coverUrl: "/images/dragon-treasure.png",
    createdAt: "2024-05-23T20:03:00Z",
    text: "The brave pirate set sail to find his missing hat, guided by the brightest star in the sky.",
  },
  {
    id: 3,
    title: "The Magical Treehouse",
    coverUrl: "/images/space-journey.png",
    createdAt: "2024-05-22T16:54:00Z",
    text: "A group of friends discovers a magical treehouse that travels to fantastical lands.",
  },
  // ... add more mock stories as needed
];

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const StoryViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [page, setPage] = useState(0); // 0 for title, 1 for text

  // Find the current story and index for navigation
  const storyIndex = useMemo(
    () => MOCK_STORIES.findIndex(s => String(s.id) === storyId),
    [storyId]
  );
  const story = MOCK_STORIES[storyIndex];

  const hasPrev = storyIndex > 0;
  const hasNext = storyIndex < MOCK_STORIES.length - 1;
  const goPrev = () => {
    if (hasPrev) navigate(`/dashboard/stories/${MOCK_STORIES[storyIndex - 1].id}`);
  };
  const goNext = () => {
    if (hasNext) navigate(`/dashboard/stories/${MOCK_STORIES[storyIndex + 1].id}`);
  };
  const goBack = () => navigate("/dashboard");

  const rtl = story && (isArabic(story.title) || isArabic(story.text));

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
    const cb = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", cb);
    return () => document.removeEventListener("fullscreenchange", cb);
  }, []);

  if (!story) {
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

  // Only 2 "pages" (0=title, 1=story text)
  const numPages = 2;

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
          {/* Left Side - Story (Title Page or Text Page) */}
          <StoryText
            title={story.title}
            text={story.text}
            page={page}
            rtl={rtl}
          />

          {/* Right Side - Visual - No Rounded Corners! */}
          <StoryVisual
            coverUrl={story.coverUrl}
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
