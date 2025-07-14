
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppearanceHairStepProps {
  selectedHair: string;
  customHair: string;
  onHairChange: (hair: string) => void;
  onCustomHairChange: (hair: string) => void;
  onNext: () => void;
}

const HAIR_OPTIONS = [
  { value: "long brown hair", label: "Long Brown", emoji: "👱‍♀️" },
  { value: "short blonde hair", label: "Short Blonde", emoji: "👱" },
  { value: "curly black hair", label: "Curly Black", emoji: "👩‍🦱" },
  { value: "straight red hair", label: "Straight Red", emoji: "👩‍🦰" },
  { value: "wavy silver hair", label: "Wavy Silver", emoji: "👵" },
  { value: "braided golden hair", label: "Braided Golden", emoji: "👸" },
  { value: "spiky blue hair", label: "Spiky Blue", emoji: "🦄" },
  { value: "flowing purple hair", label: "Flowing Purple", emoji: "🧙‍♀️" },
  { value: "twin ponytails", label: "Twin Ponytails", emoji: "👧" },
  { value: "messy green hair", label: "Messy Green", emoji: "🧚‍♀️" },
  { value: "rainbow hair", label: "Rainbow Hair", emoji: "🌈" },
  { value: "no hair", label: "No Hair", emoji: "👨‍🦲" },
  { value: "other", label: "Other", emoji: "✨" },
];

const AppearanceHairStep: React.FC<AppearanceHairStepProps> = ({ 
  selectedHair, 
  customHair, 
  onHairChange, 
  onCustomHairChange, 
  onNext 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedHair) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What hair color and style does your character have?</Label>
        <p className="text-gray-600">Choose the hair that fits your character best!</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {HAIR_OPTIONS.map(hair => (
            <Button
              key={hair.value}
              variant={selectedHair === hair.value ? "default" : "outline"}
              onClick={() => onHairChange(hair.value)}
              className={`h-20 p-3 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                selectedHair === hair.value 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                  : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
              }`}
            >
              <span className="text-2xl">{hair.emoji}</span>
              <span className="text-center">{hair.label}</span>
            </Button>
          ))}
        </div>

        {selectedHair === "other" && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="customHair" className="text-lg">Custom Hair Color & Style</Label>
            <Input
              id="customHair"
              value={customHair}
              onChange={(e) => onCustomHairChange(e.target.value)}
              placeholder="Describe your custom hair color and style..."
              className="p-4 text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceHairStep;
