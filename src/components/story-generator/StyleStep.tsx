
import React from "react";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { Sparkles } from "lucide-react";
import NarrativeStyleSelector from "@/components/story-generator/NarrativeStyleSelector";

interface StyleStepProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const StyleStep: React.FC<StyleStepProps> = ({ storyData, updateStoryData }) => {
  return (
    <StorySettingStep 
      title="How Should Your Story Be Told?"
      description="Pick a way to tell your story"
      icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
    >
      <div className="mt-4">
        {storyData.narrativeStyle && (
          <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl inline-block">
            You picked: <span className="font-bold">{storyData.narrativeStyle}</span>
          </div>
        )}
        
        <div className="narrative-style-selector">
          <NarrativeStyleSelector 
            selectedStyle={storyData.narrativeStyle} 
            onSelectStyle={(styleId) => updateStoryData({ narrativeStyle: styleId })} 
          />
        </div>
      </div>
    </StorySettingStep>
  );
};

export default StyleStep;
