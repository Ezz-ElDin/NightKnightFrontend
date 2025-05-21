
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LANGUAGES } from "./constants";
import { Flag, Wrench } from "lucide-react";

interface StoryModeStepProps {
  mode: "magic" | "creative";
  setMode: (mode: "magic" | "creative") => void;
  language: string;
  setLanguage: (lang: string) => void;
  ageRange: string;
  setAgeRange: (range: string) => void;
}

const StoryModeStep: React.FC<StoryModeStepProps> = ({
  mode,
  setMode,
  language,
  setLanguage,
  ageRange,
  setAgeRange
}) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3 justify-center mb-2">
        <span className="text-2xl" role="img" aria-label="Sparkles">✨</span>
        Let's Make a Story!
        <span className="text-2xl" role="img" aria-label="Sparkles">✨</span>
      </h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        <label className="font-semibold mb-1 text-lg">Choose Your Adventure</label>
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
            <span className="text-sm text-muted-foreground">Recommended for young adventurers!</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="creative"
            aria-label="Creative Mode"
            className={`flex-1 rounded-xl border-2 border-orange-200 py-5 px-3 flex flex-col items-center gap-2 bg-orange-50 ${mode === "creative" ? "ring-4 ring-orange-300 scale-105 text-orange-900 font-bold" : ""}`}
          >
            <span className="text-3xl">🛠</span>
            <span className="font-bold text-lg">Creative Mode</span>
            <span className="text-sm text-muted-foreground">I want to choose everything!</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mt-6">
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
                <span role="img" aria-label={lang.id}>{lang.flag}</span> {lang.id}
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
                className={`flex-1 py-3 px-2 rounded-lg border-2 transition-all 
                  ${ageRange === range
                    ? "bg-primary text-white font-bold ring-4 ring-primary/30"
                    : "bg-primary/10 hover:bg-primary/20"}`}
                onClick={() => setAgeRange(range)}
                type="button"
              >
                {range} years
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModeStep;
