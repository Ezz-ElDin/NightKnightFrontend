
import React from "react";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
// COMMENTED OUT: Hide mode selector from user - always use creative mode
// import ModeSelector from "./ModeSelector";
import AgeRangeSelector from "./AgeRangeSelector";
import LanguageSelector from "./LanguageSelector";
import LessonInput from "./LessonInput";
// COMMENTED OUT: Hide title input from first page
// import TitleInput from "./TitleInput";

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
  // FORCE CREATIVE MODE: Always set mode to creative when component mounts
  React.useEffect(() => {
    if (mode !== "creative") {
      setMode("creative");
    }
  }, [mode, setMode]);

  // COMMENTED OUT: Backend will handle page count instead of frontend forcing it
  // Always force pages=10
  // React.useEffect(() => {
  //   if (storyData.pages !== 10) updateStoryData({ pages: 10 });
  // }, [storyData.pages, updateStoryData]);

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
            <p className="text-base text-muted-foreground mt-0.5 ml-8">Let's set up your story adventure!</p>
          </div>
          <div className="flex flex-col gap-6">
            {/* COMMENTED OUT: Hide mode selector - always use creative mode */}
            {/* <ModeSelector mode={mode} setMode={setMode} /> */}
            <AgeRangeSelector ageRange={ageRange} setAgeRange={setAgeRange} />
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <LessonInput value={storyData.moral} onChange={v => updateStoryData({ moral: v })} />
            {/* COMMENTED OUT: Hide title input from first page */}
            {/* <TitleInput value={storyData.title} onChange={v => updateStoryData({ title: v })} /> */}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default StoryStartStep;
