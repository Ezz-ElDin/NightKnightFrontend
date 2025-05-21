
import React from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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

  // Animation states for mode
  const [modeHovered, setModeHovered] = React.useState<"magic" | "creative" | null>(null);
  // Vertical layout handler for tooltip open state
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center w-full py-6 animate-fade-in">
        <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-3xl border-2 border-primary/10 bg-white/90 px-5 md:px-8 py-8 min-h-[470px]">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl" role="img" aria-label="sparkles">✨</span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary drop-shadow-sm font-ghibli">
                Start Your Story
              </h2>
            </div>
            <p className="text-base text-muted-foreground mt-0.5 ml-8">Let’s set up your story adventure!</p>
          </div>

          {/* All options vertically */}
          <div className="flex flex-col gap-6">
            {/* --- Mode Selector (vertical, animated, tooltip better placed) --- */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
                <span role="img" aria-label="magic">🪄</span>
                Choose Mode
              </label>
              <div className="flex flex-col gap-3 mt-1">
                {/* Magic Button */}
                <button
                  type="button"
                  onClick={() => setMode("magic")}
                  onMouseEnter={() => setModeHovered("magic")}
                  onMouseLeave={() => setModeHovered(null)}
                  className={`w-full py-3 rounded-xl text-base md:text-lg font-bold border-2 transition-all duration-300
                  ${mode === "magic" || modeHovered === "magic"
                    ? "bg-orange-400/90 text-white border-orange-400 shadow-lg scale-105 ring-4 ring-pink-200"
                    : "bg-orange-300/10 text-orange-800 border-orange-300/30 hover:bg-orange-200/40"}
                  `}
                  tabIndex={0}
                >
                  Magic
                </button>
                {/* Creative Button + Help Tooltip (placed next to label above, not button) */}
                <div className="relative w-full flex items-center">
                  <button
                    type="button"
                    onClick={() => setMode("creative")}
                    onMouseEnter={() => setModeHovered("creative")}
                    onMouseLeave={() => setModeHovered(null)}
                    className={`flex-1 py-3 rounded-xl text-base md:text-lg font-bold border-2 transition-all duration-300 relative
                      ${mode === "creative" || modeHovered === "creative"
                        ? "bg-purple-400/90 text-white border-purple-400 shadow-lg scale-105 ring-4 ring-purple-200"
                        : "bg-purple-300/10 text-purple-800 border-purple-300/30 hover:bg-purple-200/40"}
                    `}
                    tabIndex={0}
                  >
                    Creative
                  </button>
                  <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="ml-2 w-6 h-6 rounded-full bg-purple-100 hover:bg-purple-200 border border-purple-300 flex items-center justify-center text-purple-700 text-base font-bold cursor-pointer select-none transition shadow"
                        tabIndex={0}
                        aria-label="What is Creative Mode?"
                        onClick={e => {
                          e.stopPropagation();
                          setTooltipOpen((v) => !v);
                        }}
                        onMouseEnter={() => setTooltipOpen(true)}
                        onMouseLeave={() => setTooltipOpen(false)}
                      >?</button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      align="center"
                      className="max-w-[250px] bg-purple-600 text-white text-sm px-4 py-2 rounded-2xl border-0 shadow-xl font-ghibli font-normal z-50"
                    >
                      The existing full experience, for older children and grown-up storytellers who want to choose everything.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Story Title */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
                <span role="img" aria-label="book">📖</span>
                Story Title
              </label>
              <input
                type="text"
                value={storyData.title}
                onChange={e => updateStoryData({ title: e.target.value })}
                maxLength={35}
                placeholder="Name your story (or leave blank for a surprise!)"
                className="w-full rounded-xl border-2 border-primary/10 text-base md:text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-primary focus:ring-2 focus:ring-primary font-ghibli"
                autoComplete="off"
                spellCheck={true}
                aria-label="Story Title"
              />
            </div>

            {/* Moral / Lesson */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-yellow-900 mb-1">
                <span role="img" aria-label="star">⭐</span>
                Story Lesson
              </label>
              <input
                type="text"
                value={storyData.moral}
                onChange={e => updateStoryData({ moral: e.target.value })}
                maxLength={30}
                placeholder="What should kids learn? (kindness, bravery...)"
                className="w-full rounded-xl border-2 border-yellow-400/30 text-base md:text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300/40 font-ghibli"
                autoComplete="off"
                spellCheck={true}
                aria-label="Story Lesson"
              />
            </div>

            {/* Language */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-1">
                <span className="inline-block text-2xl align-middle" role="img" aria-label="globe">
                  🌎
                </span>
                Language
              </label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full rounded-xl border-2 border-blue-400/30 text-base md:text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-ghibli"
                aria-label="Language"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
                <span role="img" aria-label="child">👧</span>
                Age Range
              </label>
              <div className="flex gap-3">
                {AGE_OPTIONS.map(option => (
                  <button
                    key={option.label}
                    type="button"
                    className={`flex-1 py-3 rounded-xl text-base font-bold transition-all border-2
                      ${ageRange === option.label
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

            {/* How Long (HIDDEN) */}
            {/* <div>
              ...was here ...
            </div> */}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default StoryStartStep;
