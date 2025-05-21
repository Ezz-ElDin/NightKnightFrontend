
import React from "react";
import StoryStartStep from "@/components/story-generator/StoryStartStep";

const StoryStartStepWrapper = ({
  mode,
  setMode,
  language,
  setLanguage,
  ageRange,
  setAgeRange,
  storyData,
  updateStoryData,
}: any) => (
  <StoryStartStep
    mode={mode}
    setMode={setMode}
    language={language}
    setLanguage={setLanguage}
    ageRange={ageRange}
    setAgeRange={setAgeRange}
    storyData={storyData}
    updateStoryData={updateStoryData}
  />
);

export default StoryStartStepWrapper;
