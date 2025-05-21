
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Book,
  Text,
  Smile,
  Palette,
  Cake,
  Clock,
  Users,
  Handshake,
  Star,
  Languages,
} from "lucide-react";

type StoryMode = "magic" | "creative";

interface StorySummaryProps {
  storyData: any;
  onGenerateStory: () => void;
  mode?: StoryMode; // Optionally pass, default to 'creative'
}

// Creative mode: Story Title, Age, Language, Story Lesson, Theme, Tone, Style, Characters
const creativeFields = [
  {
    key: "title",
    label: "Title",
    icon: <Text className="text-indigo-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "ageRange",
    label: "Age",
    icon: <Cake className="text-emerald-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "language",
    label: "Language",
    icon: <Languages className="text-blue-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "moral",
    label: "Story Lesson",
    icon: <Handshake className="text-green-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "genre",
    label: "Theme",
    icon: <Book className="text-pink-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "tone",
    label: "Tone",
    icon: <Smile className="text-yellow-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "narrativeStyle",
    label: "Style",
    icon: <Palette className="text-purple-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "characters",
    label: "Characters",
    icon: <Users className="text-blue-400 w-6 h-6 shrink-0" />,
  },
];

// Magic mode: Age, Language, Story Lesson, Story World (genre), Characters
const magicFields = [
  {
    key: "ageRange",
    label: "Age",
    icon: <Cake className="text-emerald-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "language",
    label: "Language",
    icon: <Languages className="text-blue-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "moral",
    label: "Story Lesson",
    icon: <Handshake className="text-green-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "genre",
    label: "Story World",
    icon: <Book className="text-pink-400 w-6 h-6 shrink-0" />,
  },
  {
    key: "characters",
    label: "Characters",
    icon: <Users className="text-blue-400 w-6 h-6 shrink-0" />,
  },
];

const StorySummary: React.FC<StorySummaryProps> = ({
  storyData,
  onGenerateStory,
  mode = "creative",
}) => {
  // Pick fields by mode
  const fields = mode === "magic" ? magicFields : creativeFields;

  return (
    <div className="flex flex-col items-center py-8 animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl shadow-2xl border-4 border-white/70 bg-gradient-to-b from-[#ede9fe] via-[#a7f3d0]/40 to-[#fff] p-6 md:p-10 space-y-6 relative">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary flex items-center justify-center gap-2 mb-2">
          ✨ Story Preview ✨
        </h2>
        <p className="text-center text-muted-foreground mb-2 text-lg">
          Get ready for an adventure! Here’s what will go into your magical story:
        </p>
        <ul className="flex flex-col gap-4">
          {fields.map(({ key, label, icon }) => {
            // Characters rendered as tags, always show
            if (key === "characters") {
              return (
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
                    <span className="ml-auto text-muted-foreground italic">{`No ${label}`}</span>
                  )}
                </li>
              );
            }
            // Age (make color match - use text-story-seafoam for the label and value)
            if (key === "ageRange") {
              return (
                <li
                  key={key}
                  className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl border shadow transition-all hover:scale-105"
                >
                  {icon}
                  <span className="font-bold text-story-seafoam">{label}:</span>
                  {storyData.ageRange ? (
                    <span className="ml-auto text-lg text-story-seafoam">{storyData.ageRange}</span>
                  ) : (
                    <span className="ml-auto text-muted-foreground italic">{`No ${label}`}</span>
                  )}
                </li>
              );
            }
            // Language/Lesson/etc: Always show, show empty/emphasized if blank
            return (
              <li
                key={key}
                className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl border shadow transition-all hover:scale-105"
              >
                {icon}
                <span className="font-bold text-story-seafoam">{label}:</span>
                {storyData[key] ? (
                  <span className="ml-auto text-lg">{storyData[key]}</span>
                ) : (
                  <span className="ml-auto text-muted-foreground italic">{`No ${label}`}</span>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-6 px-2 border-t-2 border-dashed border-primary/30">
          <Button
            data-testid="generate-btn"
            onClick={onGenerateStory}
            size="lg"
            className="w-full sm:w-auto justify-center px-8 py-6 text-xl font-black rounded-full bg-gradient-to-br from-violet-500 via-purple-400 to-blue-400
              shadow-lg hover:from-violet-600 hover:via-purple-500 hover:to-blue-500 transition-all duration-300 button-bounce tracking-wide"
          >
            Create My Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorySummary;

