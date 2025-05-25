
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

  const goBack = () => {
    navigate('/dashboard');
  };

  const story = MOCK_STORIES.find(s => String(s.id) === storyId);

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-primary mb-2">Story Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">Sorry, we couldn't find that story.</p>
        <Button onClick={goBack} variant="outline">Back to Dashboard</Button>
      </div>
    );
  }

  // Determine if this story content should be rendered RTL.
  const rtl = isArabic(story.title) || isArabic(story.text);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-0 md:p-0 overflow-hidden flex flex-col">
        {/* Mock-up like forbidden screen */}
        <div className="py-16 flex flex-col items-center border-b">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#28a5e5]">NightKnight</h1>
          <h2 className="text-2xl font-bold mb-2">Story Viewer</h2>
          <span className="text-gray-500 mb-6">Enjoy your adventure below!</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goBack}
            className="mb-2"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        {/* Book-like layout */}
        <div className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Left Side - Story Text */}
          <div 
            className={`flex-1 p-8 flex flex-col ${rtl ? "rtl text-right" : "ltr text-left"} justify-center`}
            dir={rtl ? "rtl" : "ltr"}
          >
            <h3 className="font-ghibli text-2xl font-bold mb-4">{story.title}</h3>
            <p className="text-lg mb-2">{story.text}</p>
            <div className="text-xs text-gray-400 mt-auto">
              Created: {new Date(story.createdAt).toLocaleDateString()} · {new Date(story.createdAt).toLocaleTimeString()}
            </div>
          </div>
          {/* Right Side - Story Visual */}
          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[#fafafd]">
            <img 
              src={story.coverUrl} 
              alt={"Illustration for " + story.title} 
              className="w-full max-w-xs rounded-xl shadow-lg mb-4"
              style={{ objectFit: "cover", aspectRatio: "3/4" }}
            />
            <span className="block text-gray-400 text-center text-xs">Illustration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
