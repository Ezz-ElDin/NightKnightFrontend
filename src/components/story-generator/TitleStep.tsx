
import React from "react";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { BookOpen } from "lucide-react";
import TitleInput from "@/components/story-generator/TitleInput";

interface TitleStepProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const TitleStep: React.FC<TitleStepProps> = ({ storyData, updateStoryData }) => {
  return (
    <StorySettingStep 
      title="Name Your Story"
      description="Give your magical adventure a special title, or leave it blank for a surprise!"
      icon={<BookOpen className="h-8 w-8 text-purple-400" />}
    >
      <div className="mt-6">
        <TitleInput
          value={storyData.title}
          onChange={(title) => updateStoryData({ title })}
        />
        <p className="text-sm text-muted-foreground mt-2">
          💡 You can always leave this blank and we'll create a magical title for you!
        </p>
      </div>
    </StorySettingStep>
  );
};

export default TitleStep;
