
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "./constants";

const AGE_OPTIONS = [
  { label: "3-5", display: "3-5 years" },
  { label: "6-8", display: "6-8 years" },
  { label: "9-12", display: "9-12 years" },
];

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
  updateStoryData,
}) => {
  // Always force pages=12
  React.useEffect(() => {
    if (storyData.pages !== 12) updateStoryData({ pages: 12 });
  }, [storyData.pages, updateStoryData]);

  return (
    <div className="flex flex-col items-center w-full py-6">
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-3xl border-2 border-primary/10 bg-white/90 px-6 md:px-10 py-10 min-h-[470px]">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="sparkles">✨</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-sm font-ghibli">Start Your Story</h2>
          </div>
          <div className="pl-10 mt-1">
            <p className="text-base md:text-lg text-muted-foreground font-ghibli">Let’s set up your story adventure!</p>
          </div>
        </div>
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Story Title */}
            <div>
              <label className="flex items-center gap-2 font-bold text-lg text-primary mb-1 ml-1">
                <span role="img" aria-label="book">📖</span>
                Story Title
              </label>
              <input
                type="text"
                value={storyData.title}
                onChange={e => updateStoryData({ title: e.target.value })}
                maxLength={35}
                placeholder="Name your story (or leave blank for a surprise!)"
                className="w-full rounded-xl border-2 border-primary/10 text-lg bg-white px-5 py-3 mt-1 transition shadow-md focus:border-primary focus:ring-2 focus:ring-primary font-ghibli"
                autoComplete="off"
                spellCheck={true}
                aria-label="Story Title"
              />
            </div>
            {/* Moral / Lesson */}
            <div>
              <label className="flex items-center gap-2 font-bold text-lg text-yellow-900 mb-1 ml-1">
                <span role="img" aria-label="star">⭐</span>
                Story Lesson
              </label>
              <input
                type="text"
                value={storyData.moral}
                onChange={e => updateStoryData({ moral: e.target.value })}
                maxLength={30}
                placeholder="What should kids learn? (kindness, bravery...)"
                className="w-full rounded-xl border-2 border-yellow-400/30 text-lg bg-white px-5 py-3 mt-1 transition shadow-md focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300/40 font-ghibli"
                autoComplete="off"
                spellCheck={true}
                aria-label="Story Lesson"
              />
            </div>
            {/* Language */}
            <div>
              <label className="flex items-center gap-2 font-bold text-lg text-green-900 mb-1 ml-1">
                <span role="img" aria-label="flag">🏳️</span>
                Language
              </label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full rounded-xl border-2 border-green-400/30 text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-green-500 focus:ring-2 focus:ring-green-200 font-ghibli"
                aria-label="Language"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flag} {lang.id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-8">
            {/* Age Range */}
            <div>
              <label className="flex items-center gap-2 font-bold text-lg text-primary mb-2 ml-1">
                <span role="img" aria-label="child">👧</span>
                Age Range
              </label>
              <div className="flex gap-4">
                {AGE_OPTIONS.map(option => (
                  <button
                    key={option.label}
                    type="button"
                    className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all border-2 ${
                      ageRange === option.label
                        ? "bg-primary text-white border-primary shadow-lg"
                        : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                    }`}
                    style={{
                      minWidth: 0,
                    }}
                    onClick={() => setAgeRange(option.label)}
                  >
                    {option.display}
                  </button>
                ))}
              </div>
            </div>
            {/* Story Length - fixed to 12 pages and disabled */}
            <div>
              <label className="flex items-center gap-2 font-bold text-lg text-blue-900 mb-2 ml-1">
                <span role="img" aria-label="book">📚</span>
                How Long?
              </label>
              <div className="flex gap-2 items-center mt-2">
                <span className="text-base px-3 py-2 rounded-xl bg-blue-100 text-blue-900 font-semibold opacity-60 select-none">
                  12 pages
                </span>
                <span className="text-muted-foreground text-base italic">(fixed)</span>
              </div>
            </div>
            {/* Mode selector (optional, only show if creative/magic toggle is relevant) */}
            <div>
              <label className="flex items-center gap-2 font-bold text-lg text-orange-900 mb-2 ml-1">
                <span role="img" aria-label="magic">🪄</span>
                Choose Mode
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setMode("magic")}
                  className={`flex-1 py-3 rounded-xl text-lg font-bold border-2 transition-all ${
                    mode === "magic"
                      ? "bg-orange-400/90 text-white border-orange-400 shadow-lg"
                      : "bg-orange-300/10 text-orange-800 border-orange-300/30 hover:bg-orange-200/40"
                  }`}
                >
                  Magic
                </button>
                <button
                  type="button"
                  onClick={() => setMode("creative")}
                  className={`flex-1 py-3 rounded-xl text-lg font-bold border-2 transition-all ${
                    mode === "creative"
                      ? "bg-purple-400/90 text-white border-purple-400 shadow-lg"
                      : "bg-purple-300/10 text-purple-800 border-purple-300/30 hover:bg-purple-200/40"
                  }`}
                >
                  Creative
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoryStartStep;
