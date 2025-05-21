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
        <div className="relative flex flex-col gap-8 px-4 sm:px-10 pt-10 pb-6">
          {/* Whimsical Card Top Banner */}
          <div className="w-full flex items-center justify-center relative">
            <div className="rounded-full bg-story-yellow/40 border-4 border-story-yellow shadow animate-float px-7 py-3 flex flex-col items-center justify-center mb-2">
              <span className="text-4xl md:text-5xl flex gap-3">
                <span role="img" aria-label="sparkles">✨</span>
                <span role="img" aria-label="book">📖</span>
                <span role="img" aria-label="sparkles">✨</span>
              </span>
              <h2 className="font-extrabold text-3xl md:text-4xl text-story-purple mt-2 whitespace-nowrap drop-shadow">Create Your Story!</h2>
              <p className="text-base md:text-lg text-story-brown mt-2 font-semibold whitespace-nowrap">Let your imagination fly</p>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="flex flex-col items-center gap-3">
            <label className="text-lg font-bold text-primary flex items-center gap-2">
              <span role="img" aria-label="magic">🪄</span>
              Choose Your Adventure Mode:
            </label>
            <div className="flex gap-4 w-full md:w-fit">
              <button
                type="button"
                onClick={() => setMode("magic")}
                className={`flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition hover:scale-105 border-2 ${
                  mode === "magic"
                    ? "bg-story-purple/90 text-white border-story-purple animate-wiggle"
                    : "bg-story-purple/10 text-story-purple border-story-purple/50"
                }`}
              >
                <span className="text-2xl" role="img" aria-label="sparkles">✨</span>
                <span>Magic</span>
                <span className="text-xs font-normal text-story-purple/70 mt-1">Quick & Easy</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("creative")}
                className={`flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition hover:scale-105 border-2 ${
                  mode === "creative"
                    ? "bg-story-orange text-white border-story-orange animate-wiggle"
                    : "bg-story-orange/10 text-story-orange border-story-orange/50"
                }`}
              >
                <span className="text-2xl" role="img" aria-label="wrench">🛠️</span>
                <span>Creative</span>
                <span className="text-xs font-normal text-story-orange/80 mt-1">Choose Details</span>
              </button>
            </div>
          </div>

          {/* Language & Age, side-by-side on desktop, stacked on mobile */}
          <div className="flex flex-col md:flex-row gap-6 w-full justify-between">
            {/* Language */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <label htmlFor="language" className="font-semibold flex items-center gap-1 text-lg text-primary">
                <span role="img" aria-label="flag">🏳️</span> Language
              </label>
              <select
                id="language"
                className="rounded-xl border-2 border-story-seafoam/70 text-lg bg-white focus:ring-2 focus:ring-story-seafoam px-5 py-3 w-full min-w-[160px] transition shadow-md"
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
            {/* Age Range */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <label className="font-semibold flex items-center gap-1 text-lg text-primary">
                <span role="img" aria-label="child">👧</span> Age
              </label>
              <div className="flex gap-2 w-full justify-center">
                {AGE_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={`flex-1 rounded-xl py-3 px-2 border-2 font-semibold text-lg flex items-center justify-center gap-2 shadow-sm transition hover:scale-105 ${
                      ageRange === option.label
                        ? "bg-story-green text-white border-story-green animate-pulse"
                        : "bg-white border-story-green/30 text-story-green"
                    }`}
                    onClick={() => setAgeRange(option.label)}
                  >
                    <span>{option.emoji}</span>
                    <span>{option.label} yrs</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Story Title & Moral */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col items-center gap-2">
              <label htmlFor="story-title" className="font-semibold flex items-center gap-1 text-lg text-primary">
                <span role="img" aria-label="book">📚</span> Story Title
              </label>
              <input
                id="story-title"
                type="text"
                placeholder="Name your story"
                className="w-full p-3 text-lg rounded-xl border-2 border-story-purple/30 focus:border-story-purple/80 focus:ring-2 focus:ring-story-purple/30 bg-white transition shadow"
                value={storyData.title}
                onChange={e => updateStoryData({ title: e.target.value })}
                autoComplete="off"
                spellCheck={true}
                maxLength={35}
              />
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <label htmlFor="story-moral" className="font-semibold flex items-center gap-1 text-lg text-primary">
                <span role="img" aria-label="star">⭐</span> Lesson / Moral
              </label>
              <input
                id="story-moral"
                type="text"
                placeholder="e.g. Kindness, honesty"
                className="w-full p-3 text-lg rounded-xl border-2 border-story-orange/30 focus:border-story-orange/70 focus:ring-2 focus:ring-story-orange/20 bg-white transition shadow"
                value={storyData.moral}
                onChange={e => updateStoryData({ moral: e.target.value })}
                autoComplete="off"
                spellCheck={true}
                maxLength={30}
              />
            </div>
          </div>

          {/* Fun footer cloud illustration */}
          <div className="w-full flex justify-center mt-1">
            <div className="w-[65%] h-8 rounded-full bg-story-blue/40 blur-sm opacity-60 animate-fade-in pointer-events-none" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoryStartStep;
