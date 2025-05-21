
import React from "react";
import StorySummary from "@/components/story-generator/StorySummary";

const StorySummaryStep = ({ storyData, handleGenerateStory, mode }: any) => (
  <StorySummary
    storyData={storyData}
    onGenerateStory={handleGenerateStory}
    mode={mode}
  />
);

export default StorySummaryStep;
