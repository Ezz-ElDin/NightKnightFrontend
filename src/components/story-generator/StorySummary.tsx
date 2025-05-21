
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Book,
  Star,
  StarHalf,
  Award,
  Trophy,
  BookmarkCheck,
  Child as ChildIcon,
  BookOpen,
} from "lucide-react";

// Updated order: Title → Genre → Tone → Style → Age → Pages → Characters → Moral
const summaryFields = [
  { key: "title", label: "Title", icon: <Trophy className="text-indigo-400 w-6 h-6 shrink-0" /> },
  { key: "genre", label: "Theme", icon: <Book className="text-pink-400 w-6 h-6 shrink-0" /> },
  { key: "tone", label: "Mood", icon: <StarHalf className="text-yellow-400 w-6 h-6 shrink-0" /> },
  { key: "narrativeStyle", label: "Style", icon: <Award className="text-purple-400 w-6 h-6 shrink-0" /> },
  { key: "ageRange", label: "Age", icon: <BookOpen className="text-emerald-400 w-6 h-6 shrink-0" /> }, // Swapped "Child" with "BookOpen" for clarity
  { key: "pages", label: "Length", icon: <BookOpen className="text-blue-400 w-6 h-6 shrink-0" /> },
  { key: "characters", label: "Characters", icon: <BookmarkCheck className="text-blue-400 w-6 h-6 shrink-0" /> },
  { key: "moral", label: "Lesson", icon: <Star className="text-green-400 w-6 h-6 shrink-0" /> },
];

interface StorySummaryProps {
  storyData: any;
  onGenerateStory: () => void;
}

const StorySummary: React.FC<StorySummaryProps> = ({ storyData, onGenerateStory }) => {
  return (
    <div className="flex flex-col items-center py-8 animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl shadow-2xl border-4 border-white/70 bg-gradient-to-b from-[#ede9fe] via-[#a7f3d0]/40 to-[#fff] p-6 md:p-10 space-y-6 relative">
        <Sparkles className="absolute right-6 -top-10 text-purple-400 w-12 h-12 animate-bounce-slow opacity-60" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary flex items-center justify-center gap-2 mb-2">
          ✨ Story Preview ✨
        </h2>
        <p className="text-center text-muted-foreground mb-2 text-lg">
          Get ready for an adventure! Here’s what will go into your magical story:
        </p>
        <ul className="flex flex-col gap-4">
          {summaryFields.map(({ key, label, icon }) =>
            // Only display if value exists, except characters (always show box, even if empty)
            key === "characters" ? (
              <li
                key={key}
                className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl border shadow transition-all hover:scale-105"
              >
                {icon}
                <span className="font-bold text-story-seafoam">{label}:</span>
                {storyData.characters && storyData.characters.length > 0 ? (
                  <span className="ml-auto flex flex-wrap gap-2 max-w-xs">
                    {storyData.characters.map((c: any, idx: number) => (
                      <span
                        key={c.name + idx}
                        className="px-2 py-1 text-xs rounded-lg bg-gradient-to-r from-purple-100/60 to-teal-100/50 text-purple-700 font-semibold shadow"
                      >
                        {c.name}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="ml-auto text-gray-400 italic">
                    No characters yet
                  </span>
                )}
              </li>
            ) : key === "ageRange" ? (
              <li
                key={key}
                className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl border shadow transition-all hover:scale-105"
              >
                {icon}
                <span className="font-bold text-emerald-600">{label}:</span>
                <span className="ml-auto text-lg">{storyData.ageRange}</span>
              </li>
            ) : key === "pages" ? (
              <li
                key={key}
                className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl border shadow transition-all hover:scale-105"
              >
                {icon}
                <span className="font-bold text-blue-600">{label}:</span>
                <span className="ml-auto text-lg">
                  {storyData.pages} pages
                </span>
              </li>
            ) : (
              storyData[key] && (
                <li
                  key={key}
                  className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl border shadow transition-all hover:scale-105"
                >
                  {icon}
                  <span className="font-bold text-story-seafoam">{label}:</span>
                  <span className="ml-auto text-lg">{storyData[key]}</span>
                </li>
              )
            )
          )}
        </ul>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-6 px-2 border-t-2 border-dashed border-primary/30">
          <Button
            data-testid="generate-btn"
            onClick={onGenerateStory}
            size="lg"
            className="w-full sm:w-auto justify-center px-8 py-6 text-xl font-black rounded-full bg-gradient-to-br from-violet-500 via-purple-400 to-blue-400
              shadow-lg hover:from-violet-600 hover:via-purple-500 hover:to-blue-500 transition-all duration-300 button-bounce tracking-wide"
          >
            <Sparkles className="mr-2 h-7 w-7 text-yellow-400" />
            Create My Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorySummary;
