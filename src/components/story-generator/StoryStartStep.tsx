
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
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

const AGE_OPTIONS = [
  { label: "3-5", emoji: "🧸" },
  { label: "6-8", emoji: "🎈" },
  { label: "9-12", emoji: "🚀" },
];

const StoryStartStep: React.FC<StoryStartStepProps> = ({
  mode,
  setMode,
  language,
  setLanguage,
  ageRange,
  setAgeRange,
  storyData,
  updateStoryData,
}) => {
  // Always force 12 pages behind the scenes
  React.useEffect(() => {
    if (storyData.pages !== 12) {
      updateStoryData({ pages: 12 });
    }
  }, [storyData.pages, updateStoryData]);

  return (
    <div className="flex flex-col items-center w-full py-6">
      <Card className="w-full max-w-2xl mx-auto p-0 rounded-2xl shadow-lg border-2 border-primary/10 bg-white/90">
        <div className="px-7 pt-8 pb-2 flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col items-center justify-center gap-1 pb-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-1 flex items-center gap-2">
              <span role="img" aria-label="sparkles">🌟</span>
              Start Your Story!
              <span role="img" aria-label="sparkles">🌟</span>
            </h2>
            <p className="text-md text-muted-foreground font-medium">Pick your style and give your story a unique start.</p>
          </div>

          {/* Step 1: Mode select */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-lg mb-1">Choose your mode</label>
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={v => v && setMode(v as "magic" | "creative")}
              className="flex w-full gap-4"
            >
              <ToggleGroupItem
                value="magic"
                aria-label="Magic Mode"
                className={`w-1/2 px-0 py-4 transition-all
                  border-2 rounded-xl
                  ${mode === "magic" ? "border-primary bg-primary/10 ring-4 ring-primary/20 scale-105 font-bold text-primary" : "border-primary/30 text-primary/70 bg-white hover:bg-primary/5"}
                `}
              >
                <span className="text-2xl" role="img" aria-label="Magic">✨</span>
                <span className="ml-2 text-lg">Magic</span>
                <div className="mt-0 text-xs text-muted-foreground">Quick & easy!</div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="creative"
                aria-label="Creative Mode"
                className={`w-1/2 px-0 py-4 transition-all
                  border-2 rounded-xl
                  ${mode === "creative" ? "border-orange-400 bg-orange-50 ring-4 ring-orange-200 scale-105 font-bold text-orange-900" : "border-orange-200 text-orange-900/60 bg-white hover:bg-orange-50"}
                `}
              >
                <span className="text-2xl" role="img" aria-label="Wrench">🛠</span>
                <span className="ml-2 text-lg">Creative</span>
                <div className="mt-0 text-xs text-muted-foreground">Choose every detail!</div>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Step 2: Language select & Age range (side by side on desktop, stacked mobile) */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6 w-full">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="language" className="font-semibold text-lg mb-1 flex items-center gap-1">
                <span role="img" aria-label="flag">🏳️</span> Language
              </label>
              <select
                id="language"
                className="rounded-xl border-2 text-lg border-emerald-200 focus:ring-2 focus:ring-emerald-200 px-4 py-3 bg-white appearance-none min-w-0"
                style={{ minHeight: "48px" }}
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
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-semibold text-lg mb-1 flex items-center gap-1">
                <span role="img" aria-label="child">👧</span> Age Range
              </label>
              <div className="flex w-full gap-3">
                {AGE_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={`flex-1 py-2 px-2 rounded-lg border-2 transition-all text-base flex items-center justify-center gap-2
                      ${ageRange === option.label
                        ? "bg-primary text-white font-bold ring-4 ring-primary/30 border-primary scale-105"
                        : "border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary"}
                    `}
                    onClick={() => setAgeRange(option.label)}
                  >
                    <span>{option.emoji}</span>
                    {option.label} yrs
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Step 3: Story details */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="story-title" className="font-semibold text-lg flex items-center gap-1">
                <span role="img" aria-label="book">📚</span> Story Title
              </label>
              <input
                id="story-title"
                type="text"
                placeholder="(Optional) Name your story"
                className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 bg-white"
                value={storyData.title}
                onChange={e => updateStoryData({ title: e.target.value })}
                autoComplete="off"
                spellCheck={true}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="story-moral" className="font-semibold text-lg flex items-center gap-1">
                <span role="img" aria-label="star">⭐</span> Lesson / Moral
              </label>
              <input
                id="story-moral"
                type="text"
                placeholder="(Optional) e.g. Kindness, honesty..."
                className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 bg-white"
                value={storyData.moral}
                onChange={e => updateStoryData({ moral: e.target.value })}
                autoComplete="off"
                spellCheck={true}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoryStartStep;
