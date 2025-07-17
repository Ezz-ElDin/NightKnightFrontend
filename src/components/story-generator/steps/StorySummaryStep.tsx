
import React from "react";
import StorySummary from "@/components/story-generator/StorySummary";

const StorySummaryStep = ({ storyData, handleGenerateStory, mode, isGenerating = false }: any) => (
  <StorySummary
    storyData={storyData}
    onGenerateStory={handleGenerateStory}
    mode={mode}
    isGenerating={isGenerating}
  />
);

export default StorySummaryStep;
