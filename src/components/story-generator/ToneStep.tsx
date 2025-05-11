
import React from "react";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { Sparkles } from "lucide-react";
import ToneSelector from "@/components/story-generator/ToneSelector";

interface ToneStepProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const ToneStep: React.FC<ToneStepProps> = ({ storyData, updateStoryData }) => {
  return (
    <StorySettingStep 
      title="Choose Your Story Mood"
      description="How should your story feel?"
      icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
    >
      <div className="mt-4">
        {storyData.tone && (
          <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl inline-block">
            You picked: <span className="font-bold">{storyData.tone}</span>
          </div>
        )}
        
        <div className="tone-selector">
          <ToneSelector 
            selectedTone={storyData.tone} 
            onSelectTone={(toneId) => updateStoryData({ tone: toneId })} 
          />
        </div>
      </div>
    </StorySettingStep>
  );
};

export default ToneStep;
