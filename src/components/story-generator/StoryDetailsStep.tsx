
import React from "react";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { Sparkles } from "lucide-react";

interface StoryDetailsStepProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const StoryDetailsStep: React.FC<StoryDetailsStepProps> = ({ storyData, updateStoryData }) => {
  return (
    <StorySettingStep 
      title="Final Story Details"
      description="Add the finishing touches to your story"
      icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
    >
      <div className="story-details mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span role="img" aria-label="book">📚</span> Story Title
              </h3>
              <input
                type="text"
                placeholder="Name your story (or leave blank for a surprise!)"
                className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                value={storyData.title}
                onChange={(e) => updateStoryData({ title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span role="img" aria-label="star">⭐</span> Story Lesson
              </h3>
              <input
                type="text"
                placeholder="What should kids learn? (kindness, bravery...)"
                className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                value={storyData.moral}
                onChange={(e) => updateStoryData({ moral: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span role="img" aria-label="child">👶</span> Age Range
              </h3>
              <div className="flex gap-4">
                {["3-5", "6-8", "9-12"].map((range) => (
                  <button
                    key={range}
                    className={`flex-1 py-3 px-4 text-lg rounded-xl transition-all ${
                      storyData.ageRange === range
                        ? "bg-primary text-white font-bold ring-4 ring-primary/30"
                        : "bg-primary/10 hover:bg-primary/20"
                    }`}
                    onClick={() => updateStoryData({ ageRange: range })}
                  >
                    {range} years
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span role="img" aria-label="book">📖</span> How Long?
              </h3>
              <div className="flex items-center gap-4">
                <button
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20"
                  onClick={() => updateStoryData({ pages: Math.max(5, storyData.pages - 5) })}
                >
                  Shorter
                </button>
                <div className="flex-1 text-center font-bold">
                  {storyData.pages} pages
                </div>
                <button
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20"
                  onClick={() => updateStoryData({ pages: Math.min(30, storyData.pages + 5) })}
                >
                  Longer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StorySettingStep>
  );
};

export default StoryDetailsStep;
