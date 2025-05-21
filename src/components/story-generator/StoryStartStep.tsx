
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LANGUAGES } from "./constants";

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
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-2xl space-y-8">

        {/* Step Title */}
        <div className="flex justify-center mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-primary flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="Sparkles">✨</span>
            Start Your Adventure!
            <span className="text-2xl" role="img" aria-label="Sparkles">✨</span>
          </h1>
        </div>

        {/* Mode Toggle */}
        <div className="rounded-2xl px-5 py-6 bg-gradient-to-r from-violet-100/60 to-pink-100/40 shadow-md flex flex-col items-center space-y-3 border-2 border-primary/10">
          <label className="font-semibold text-lg mb-2 text-center w-full">Choose your mode</label>
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(v) => v && setMode(v as "magic" | "creative")}
            className="w-full flex gap-4"
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

        {/* Language & Age - Same row on desktop, stacked mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-50/70 to-white/80 shadow border border-emerald-100 flex flex-col">
            <label htmlFor="language" className="font-semibold mb-2 text-lg flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="Flag">🏳️</span> Choose Your Language
            </label>
            <select
              id="language"
              className="p-3 rounded-xl border-2 text-lg border-emerald-200 focus:ring-2 focus:ring-emerald-200"
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
          <div className="rounded-2xl p-5 bg-gradient-to-br from-yellow-50/70 to-white/80 shadow border border-yellow-100 flex flex-col">
            <label className="font-semibold mb-2 text-lg flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="Child">👶</span> Select Age Range
            </label>
            <div className="flex gap-2 mt-1">
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
          <div className="rounded-2xl p-5 border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white/90 shadow space-y-2">
            <label className="font-bold flex items-center gap-2 text-lg" htmlFor="story-title">
              <span role="img" aria-label="Book">📚</span> Story Title
            </label>
            <input
              id="story-title"
              type="text"
              placeholder="Name your story (or leave blank for a surprise!)"
              className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 bg-white"
              value={storyData.title}
              onChange={(e) => updateStoryData({ title: e.target.value })}
              autoComplete="off"
              spellCheck={true}
            />
          </div>
          <div className="rounded-2xl p-5 border border-amber-100 bg-gradient-to-br from-yellow-50/70 to-white/90 shadow space-y-2">
            <label className="font-bold flex items-center gap-2 text-lg" htmlFor="story-moral">
              <span role="img" aria-label="Star">⭐</span> Story Lesson
            </label>
            <input
              id="story-moral"
              type="text"
              placeholder="What should kids learn? (kindness, bravery...)"
              className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 bg-white"
              value={storyData.moral}
              onChange={(e) => updateStoryData({ moral: e.target.value })}
              autoComplete="off"
              spellCheck={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryStartStep;

