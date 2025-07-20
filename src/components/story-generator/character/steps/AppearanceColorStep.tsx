
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppearanceColorStepProps {
  selectedColor: string;
  customColor: string;
  onColorChange: (color: string) => void;
  onCustomColorChange: (color: string) => void;
  onNext: () => void;
  characterName?: string;
}

const COLOR_OPTIONS = [
  { value: "golden", label: "Golden", color: "bg-yellow-400" },
  { value: "silver", label: "Silver", color: "bg-gray-300" },
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "pink", label: "Pink", color: "bg-pink-400" },
  { value: "black", label: "Black", color: "bg-black" },
  { value: "white", label: "White", color: "bg-white border-2 border-gray-300" },
  { value: "brown", label: "Brown", color: "bg-amber-700" },
  { value: "rainbow", label: "Rainbow", color: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" },
  { value: "other", label: "Other", color: "bg-gray-100 border-2 border-dashed border-gray-400" },
];

const AppearanceColorStep: React.FC<AppearanceColorStepProps> = ({ 
  selectedColor, 
  customColor, 
  onColorChange, 
  onCustomColorChange, 
  onNext,
  characterName 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedColor) {
      onNext();
    }
  };

  const questionText = characterName 
    ? `What skin colour is ${characterName}?`
    : "What skin colour is your character?";

  const descriptionText = characterName
    ? `Choose the main skin colour that describes ${characterName}!`
    : "Choose the main skin colour that describes your character!";

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">{questionText}</Label>
        <p className="text-gray-600">{descriptionText}</p>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {COLOR_OPTIONS.map(color => (
            <Button
              key={color.value}
              variant={selectedColor === color.value ? "default" : "outline"}
              onClick={() => onColorChange(color.value)}
              className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                selectedColor === color.value 
                  ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                  : "hover:scale-105 hover:shadow-md"
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${color.color}`}></div>
              <span>{color.label}</span>
            </Button>
          ))}
        </div>

        {selectedColor === "other" && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="customColor" className="text-lg">Custom Colour</Label>
            <Input
              id="customColor"
              value={customColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              placeholder="Describe your custom colour..."
              className="p-4 text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceColorStep;
