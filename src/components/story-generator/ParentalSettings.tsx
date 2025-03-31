
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ParentalSettingsProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const ParentalSettings: React.FC<ParentalSettingsProps> = ({ storyData, updateStoryData }) => {
  const [wordToAvoid, setWordToAvoid] = useState("");

  const toggleSetting = (setting: string) => {
    updateStoryData({
      parentalSettings: {
        ...storyData.parentalSettings,
        [setting]: !storyData.parentalSettings[setting]
      }
    });
  };

  const addWordToAvoid = () => {
    if (!wordToAvoid.trim()) return;
    
    updateStoryData({
      parentalSettings: {
        ...storyData.parentalSettings,
        wordsToAvoid: [...storyData.parentalSettings.wordsToAvoid, wordToAvoid.trim()]
      }
    });
    
    setWordToAvoid("");
  };

  const removeWordToAvoid = (word: string) => {
    updateStoryData({
      parentalSettings: {
        ...storyData.parentalSettings,
        wordsToAvoid: storyData.parentalSettings.wordsToAvoid.filter(w => w !== word)
      }
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <Info className="h-6 w-6" />
        Parental Settings
      </h2>

      {/* Content Filter Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="content-filter" className="font-medium">Content Filter</Label>
          <p className="text-sm text-muted-foreground">
            Ensure your child's story remains playful and positive
          </p>
        </div>
        <Switch
          id="content-filter"
          checked={storyData.parentalSettings.contentFilter}
          onCheckedChange={() => toggleSetting("contentFilter")}
        />
      </div>
      
      {/* Language Control (Word Filter) */}
      <div className="space-y-3">
        <Label className="font-medium">Words or Concepts to Avoid</Label>
        <div className="flex gap-2">
          <Input
            placeholder="E.g., monsters, scary, nightmares"
            value={wordToAvoid}
            onChange={(e) => setWordToAvoid(e.target.value)}
            className="input-kiddy"
          />
          <Button 
            onClick={addWordToAvoid}
            variant="outline"
            className="border-primary text-primary hover:text-primary hover:bg-primary/10"
          >
            Add
          </Button>
        </div>
        
        {storyData.parentalSettings.wordsToAvoid.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {storyData.parentalSettings.wordsToAvoid.map((word: string) => (
              <div 
                key={word}
                className="bg-muted px-3 py-1 rounded-full flex items-center gap-1"
              >
                <span>{word}</span>
                <button
                  onClick={() => removeWordToAvoid(word)}
                  className="text-muted-foreground hover:text-destructive ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No words added yet. Add words or concepts you'd like to avoid in the story.
          </p>
        )}
      </div>
      
      {/* Sensitivity Settings */}
      <div className="space-y-3">
        <Label className="font-medium">Story Sensitivity</Label>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="avoid-scary" 
              checked={storyData.parentalSettings.avoidScaryScenes}
              onCheckedChange={() => toggleSetting("avoidScaryScenes")}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="avoid-scary"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Avoid scary scenes
              </label>
              <p className="text-sm text-muted-foreground">
                Keep the story free of frightening elements
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="keep-cheerful" 
              checked={storyData.parentalSettings.keepCheerful}
              onCheckedChange={() => toggleSetting("keepCheerful")}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="keep-cheerful"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep tone cheerful and light
              </label>
              <p className="text-sm text-muted-foreground">
                Maintain a positive mood throughout the story
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="ensure-inclusive" 
              checked={storyData.parentalSettings.ensureInclusive}
              onCheckedChange={() => toggleSetting("ensureInclusive")}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="ensure-inclusive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ensure inclusive and culturally sensitive content
              </label>
              <p className="text-sm text-muted-foreground">
                Create stories that respect diversity and different backgrounds
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Override Priority */}
      <Tooltip>
        <div className="flex items-center justify-between bg-accent/50 p-4 rounded-xl">
          <div>
            <Label htmlFor="override-priority" className="font-medium">Override Priority</Label>
            <p className="text-sm text-muted-foreground">
              These settings will override any conflicting inputs
            </p>
          </div>
          <TooltipTrigger asChild>
            <Switch
              id="override-priority"
              checked={storyData.parentalSettings.overridePriority}
              onCheckedChange={() => toggleSetting("overridePriority")}
            />
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <p className="w-64 text-sm">
            When enabled, these parental settings will take precedence over conflicting story settings or character traits.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ParentalSettings;
