
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LANGUAGES } from "./constants";
import { Flag } from "lucide-react";

interface StoryStartStepProps {
  mode: "magic" | "creative";
  setMode: (mode: "magic" | "creative") => void;
  language: string;
  setLanguage: (lang: string) => void;
  ageRange: string;
  setAgeRange: (range: string) => void;
  storyData: any;
  updateStoryData: (data: any) => void;
}

const StoryStartStep: React.FC<StoryStartStepProps> = ({
  mode,
  setMode,
  language,
  setLanguage,
  ageRange,
  setAgeRange,
  storyData,
  updateStoryData
}) => {
  // Ensure pages is always 12
  React.useEffect(() => {
    if (storyData.pages !== 12) {
      updateStoryData({ pages: 12 });
    }
  }, [storyData.pages, updateStoryData]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary flex items-center gap-3 justify-center mb-2">
        <span className="text-2xl" role="img" aria-label="Sparkles">✨</span>
        Start Your Adventure!
        <span className="text-2xl" role="img" aria-label="Sparkles">✨</span>
      </h1>
      <div className="bg-white/90 rounded-2xl p-6 shadow-md max-w-2xl mx-auto flex flex-col space-y-6 border border-primary/10">

        {/* Mode Selection */}
        <div className="flex flex-col gap-4">
          <label className="font-semibold text-lg mb-1">Choose Your Adventure</label>
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(v) => v && setMode(v as "magic" | "creative")}
            className="flex gap-4"
          >
            <ToggleGroupItem
              value="magic"
              aria-label="Magic Mode"
              className={`flex-1 rounded-xl border-2 border-violet-300 py-5 px-3 flex flex-col items-center gap-2 bg-violet-50 ${mode === "magic" ? "ring-4 ring-pink-200 scale-105 text-violet-700 font-bold" : ""}`}
            >
              <span className="text-3xl" role="img" aria-label="Magic">✨</span>
              <span className="font-bold text-lg">Magic Mode</span>
              <span className="text-sm text-muted-foreground text-center">Recommended for young adventurers!</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="creative"
              aria-label="Creative Mode"
              className={`flex-1 rounded-xl border-2 border-orange-200 py-5 px-3 flex flex-col items-center gap-2 bg-orange-50 ${mode === "creative" ? "ring-4 ring-orange-300 scale-105 text-orange-900 font-bold" : ""}`}
            >
              <span className="text-3xl" role="img" aria-label="Wrench">🛠</span>
              <span className="font-bold text-lg">Creative Mode</span>
              <span className="text-sm text-muted-foreground text-center">I want to choose everything!</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Language and Age Picker */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="language" className="block font-semibold mb-1 text-lg flex items-center gap-2">
              <Flag className="h-5 w-5 text-emerald-600" /> Choose Your Language
            </label>
            <select
              id="language"
              className="w-full p-3 rounded-xl border-2 text-lg border-emerald-200 focus:ring-2 focus:ring-emerald-200"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.flag} {lang.id}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block font-semibold mb-1 text-lg">Select Age Range</label>
            <div className="flex gap-2">
              {["3-5", "6-8", "9-12"].map((range) => (
                <button
                  key={range}
                  className={`flex-1 py-3 px-2 rounded-lg border-2 text-base transition-all ${ageRange === range ? "bg-primary text-white font-bold ring-4 ring-primary/30" : "bg-primary/10 hover:bg-primary/20"}`}
                  onClick={() => setAgeRange(range)}
                  type="button"
                >
                  {range} years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Story Title & Moral */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="font-bold flex items-center gap-2 text-lg" htmlFor="story-title">
              <span role="img" aria-label="book">📚</span> Story Title
            </label>
            <input
              id="story-title"
              type="text"
              placeholder="Name your story (or leave blank for a surprise!)"
              className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              value={storyData.title}
              onChange={(e) => updateStoryData({ title: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="font-bold flex items-center gap-2 text-lg" htmlFor="story-moral">
              <span role="img" aria-label="star">⭐</span> Story Lesson
            </label>
            <input
              id="story-moral"
              type="text"
              placeholder="What should kids learn? (kindness, bravery...)"
              className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              value={storyData.moral}
              onChange={(e) => updateStoryData({ moral: e.target.value })}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryStartStep;
