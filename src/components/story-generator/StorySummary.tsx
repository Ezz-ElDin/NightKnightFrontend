
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

interface StorySummaryProps {
  storyData: any;
  onGenerateStory: () => void;
}

const StorySummary: React.FC<StorySummaryProps> = ({ storyData, onGenerateStory }) => {
  return (
    <div className="text-center py-10">
      <div className="space-y-6">
        <div className="space-y-2 bg-primary/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold">Your Story Details:</h3>
          <ul className="text-lg space-y-2">
            <li><span className="font-bold">Theme:</span> {storyData.genre}</li>
            <li><span className="font-bold">Mood:</span> {storyData.tone}</li>
            <li><span className="font-bold">Style:</span> {storyData.narrativeStyle}</li>
            <li><span className="font-bold">Characters:</span> {storyData.characters.length > 0 
              ? storyData.characters.map(c => c.name).join(", ") 
              : "No characters yet"}</li>
            {storyData.title && <li><span className="font-bold">Title:</span> {storyData.title}</li>}
            {storyData.moral && <li><span className="font-bold">Lesson:</span> {storyData.moral}</li>}
            <li><span className="font-bold">Age:</span> {storyData.ageRange} years</li>
            <li><span className="font-bold">Length:</span> {storyData.pages} pages</li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={onGenerateStory} 
            size="lg" 
            className="px-8 py-8 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-purple-300/50 transition-all duration-300 rounded-xl"
          >
            <Sparkles className="mr-2 h-6 w-6" />
            ✨ Create My Story! ✨
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorySummary;
