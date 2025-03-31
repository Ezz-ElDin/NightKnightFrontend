
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface VisualStyleProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const STYLES = [
  {
    id: "cartoonish",
    name: "Cartoonish",
    description: "Bright, colorful, and fun illustrations with exaggerated features.",
    preview: "🎨"
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Soft, dreamy illustrations with blended colors and gentle textures.",
    preview: "🌈"
  },
  {
    id: "storybook",
    name: "Storybook",
    description: "Classic children's book style with detailed, charming illustrations.",
    preview: "📚"
  },
  {
    id: "anime",
    name: "Anime",
    description: "Inspired by Japanese animation with expressive characters and colorful scenes.",
    preview: "🎭"
  },
  {
    id: "sketch",
    name: "Sketch Art",
    description: "Hand-drawn style with pencil or ink lines, creating a personal touch.",
    preview: "✏️"
  },
  {
    id: "realistic",
    name: "Realistic",
    description: "Detailed illustrations that look more like photographs than drawings.",
    preview: "🖼️"
  }
];

const VisualStyle: React.FC<VisualStyleProps> = ({ storyData, updateStoryData }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <Sparkles className="h-6 w-6" />
        Visual Style
      </h2>

      <div className="space-y-4">
        <Label>Choose an illustration style for your story</Label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STYLES.map((style) => (
            <Tooltip key={style.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "border-2 rounded-xl p-6 cursor-pointer text-center transition-all hover-scale",
                    storyData.illustrationStyle === style.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => updateStoryData({ illustrationStyle: style.id })}
                >
                  <div className="text-5xl mb-4">{style.preview}</div>
                  <h3 className="font-medium text-lg mb-1">{style.name}</h3>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="w-64 text-sm">{style.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="bg-accent/50 p-4 rounded-xl mt-8">
        <h3 className="font-medium mb-2">Style Preview</h3>
        <p className="text-sm text-muted-foreground">
          Your illustrations will be generated in {storyData.illustrationStyle ? STYLES.find(s => s.id === storyData.illustrationStyle)?.name : "the style you select"} style, 
          perfect for your {storyData.ageRange || "chosen age range"} story!
        </p>
      </div>
    </div>
  );
};

export default VisualStyle;
