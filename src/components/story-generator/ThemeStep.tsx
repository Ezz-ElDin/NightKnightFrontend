
import React from "react";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { Sparkles } from "lucide-react";
import ThemeSelector from "@/components/story-generator/ThemeSelector";

interface ThemeStepProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const ThemeStep: React.FC<ThemeStepProps> = ({ storyData, updateStoryData }) => {
  return (
    <StorySettingStep 
      title="Choose Your Story Theme"
      description="What kind of story do you want to create?"
      icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
    >
      <div className="mt-4">
        <div className="theme-selector">
          {storyData.genre && (
            <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl inline-block">
              You picked: <span className="font-bold">{storyData.genre}</span>
            </div>
          )}
        </div>
        
        <div className="theme-selector">
          <ThemeSelector 
            selectedTheme={storyData.genre} 
            onSelectTheme={(themeId) => updateStoryData({ genre: themeId })} 
          />
        </div>
      </div>
    </StorySettingStep>
  );
};

export default ThemeStep;
