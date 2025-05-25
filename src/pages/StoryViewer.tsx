
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-2 py-6 bg-white">
      <div
        className="
          w-full
          max-w-5xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-lg
          p-0
          overflow-hidden
          flex
          flex-col
          border
          border-solid
          border-gray-200
          animate-fade-in
        "
        style={{ minHeight: "60vh" }}
      >
        {/* Book Content */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            w-full
            md:divide-x
            divide-y
            md:divide-y-0
            divide-gray-200
            flex-1
          "
        >
          {/* Left Side - Story Text */}
          <div
            className={`
              flex-1
              p-8
              flex
              flex-col
              justify-center
              items-start
              ${rtl ? "rtl text-right" : "ltr text-left"}
              min-h-[340px]
            `}
            dir={rtl ? "rtl" : "ltr"}
          >
            <h3 className="font-ghibli text-2xl md:text-3xl font-bold mb-4">{story.title}</h3>
            <p className="text-lg mb-2" style={{ wordBreak: "break-word" }}>{story.text}</p>
          </div>

          {/* Right Side - Story Visual */}
          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[#fafafd] min-h-[340px]">
            <img
              src={story.coverUrl}
              alt={"Illustration for " + story.title}
              className="w-full max-w-xs rounded-xl shadow-lg object-cover aspect-[3/4] mx-auto"
            />
          </div>
        </div>

        {/* Navigation Row */}
        <div className="flex flex-row items-center justify-between w-full px-4 py-4 bg-white border-t border-gray-100 gap-2">
          <Button
            onClick={goBack}
            variant="outline"
            className="font-semibold px-4"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
          </Button>
          <div className="flex gap-2 ml-auto">
            <Button
              onClick={goPrev}
              variant="outline"
              disabled={!hasPrev}
              aria-label="Previous story"
              className="px-3"
            >
              <ArrowLeft className="h-5 w-5" /> <span className="sr-only">Previous</span>
            </Button>
            <Button
              onClick={goNext}
              variant="outline"
              disabled={!hasNext}
              aria-label="Next story"
              className="px-3"
            >
              <span className="sr-only">Next</span> <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;

