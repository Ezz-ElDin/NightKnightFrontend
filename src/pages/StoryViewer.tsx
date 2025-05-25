
import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Fullscreen } from "lucide-react";
import clsx from "clsx";

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

// Helper to determine if string is in Arabic for RTL
const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const StoryViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find the current story and index for navigation
  const storyIndex = useMemo(
    () => MOCK_STORIES.findIndex(s => String(s.id) === storyId),
    [storyId]
  );
  const story = MOCK_STORIES[storyIndex];

  // Navigation logic for next/prev story
  const hasPrev = storyIndex > 0;
  const hasNext = storyIndex < MOCK_STORIES.length - 1;
  const goPrev = () => {
    if (hasPrev) {
      navigate(`/dashboard/stories/${MOCK_STORIES[storyIndex - 1].id}`);
    }
  };
  const goNext = () => {
    if (hasNext) {
      navigate(`/dashboard/stories/${MOCK_STORIES[storyIndex + 1].id}`);
    }
  };
  const goBack = () => navigate("/dashboard");

  // RTL check
  const rtl = story && (isArabic(story.title) || isArabic(story.text));

  // Fullscreen handlers
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Listen to fullscreen change event to sync state
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
          {/* Left Side - Story Text */}
          <div
            className={clsx(
              "flex-1 p-10 flex flex-col justify-center items-start min-h-[340px]",
              rtl ? "rtl text-right" : "ltr text-left"
            )}
            dir={rtl ? "rtl" : "ltr"}
          >
            <h3 className="font-ghibli text-2xl md:text-4xl font-bold mb-6">{story.title}</h3>
            <p className="text-lg md:text-xl" style={{ wordBreak: "break-word" }}>{story.text}</p>
          </div>

          {/* Right Side - Story Visual */}
          <div className="flex-1 p-10 flex flex-col items-center justify-center bg-[#fafafd] min-h-[340px]">
            <img
              src={story.coverUrl}
              alt={"Illustration for " + story.title}
              className="w-full max-w-xs rounded-xl shadow-lg object-cover aspect-[3/4] mx-auto"
            />
          </div>
        </div>

        {/* Navigation & Fullscreen Controls */}
        <div className="flex w-full items-center justify-between px-6 py-5 bg-white border-t border-gray-100 relative min-h-[72px]">
          {/* Back Button */}
          <Button
            onClick={goBack}
            variant="outline"
            className="font-semibold px-4"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
          </Button>
          
          {/* Centered Navigation */}
          <div className={clsx(
            "flex flex-row items-center gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "z-10"
          )}>
            <Button
              onClick={goPrev}
              variant="outline"
              disabled={!hasPrev}
              aria-label="Previous story"
              className="px-3"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              onClick={goNext}
              variant="outline"
              disabled={!hasNext}
              aria-label="Next story"
              className="px-3"
            >
              <span className="sr-only">Next</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Fullscreen Button: bottom-right (fixed inside container) */}
          <div className="absolute bottom-6 right-6">
            <Button
              onClick={handleToggleFullscreen}
              variant={isFullscreen ? "secondary" : "outline"}
              size="icon"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="rounded-full shadow border"
            >
              <Fullscreen className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
