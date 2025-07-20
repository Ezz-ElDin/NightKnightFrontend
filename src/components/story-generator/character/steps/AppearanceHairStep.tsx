import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppearanceHairStepProps {
  selectedHairStyle: string;
  selectedHairColor: string;
  customHairStyle: string;
  customHairColor: string;
  onHairStyleChange: (style: string) => void;
  onHairColorChange: (color: string) => void;
  onCustomHairStyleChange: (style: string) => void;
  onCustomHairColorChange: (color: string) => void;
  onNext: () => void;
}

const HAIR_STYLE_OPTIONS = [
  { value: "short", label: "Short", emoji: "👦" },
  { value: "long", label: "Long", emoji: "👩‍🦰" },
  { value: "curly", label: "Curly", emoji: "👩‍🦱" },
  { value: "straight", label: "Straight", emoji: "👱‍♀️" },
  { value: "braided", label: "Braided", emoji: "👧" },
  { value: "ponytail", label: "Ponytail", emoji: "🎀" },
  { value: "bald", label: "Bald", emoji: "👨‍🦲" },
  { value: "other", label: "Other", emoji: "✨" },
];

const HAIR_COLOR_OPTIONS = [
  { value: "black", label: "Black", color: "bg-black" },
  { value: "brown", label: "Brown", color: "bg-amber-800" },
  { value: "blonde", label: "Blonde", color: "bg-yellow-400" },
  { value: "red", label: "Red", color: "bg-red-600" },
  { value: "grey", label: "Grey", color: "bg-gray-400" },
  { value: "white", label: "White", color: "bg-white border-2 border-gray-300" },
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "pink", label: "Pink", color: "bg-pink-400" },
  { value: "rainbow", label: "Rainbow", color: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" },
  { value: "other", label: "Other", color: "bg-gray-100 border-2 border-dashed border-gray-400" },
];

const AppearanceHairStep: React.FC<AppearanceHairStepProps> = ({ 
  selectedHairStyle,
  selectedHairColor,
  customHairStyle,
  customHairColor,
  onHairStyleChange,
  onHairColorChange,
  onCustomHairStyleChange,
  onCustomHairColorChange,
  onNext 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What does your character's hair look like?</Label>
        <p className="text-gray-600">Choose the hair style and colour that fits your character!</p>
        
        {/* Hair Style Selection */}
        <div className="space-y-3">
          <Label className="text-lg">Hair Style</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {HAIR_STYLE_OPTIONS.map(style => (
              <Button
                key={style.value}
                variant={selectedHairStyle === style.value ? "default" : "outline"}
                onClick={() => onHairStyleChange(style.value)}
                className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                  selectedHairStyle === style.value 
                    ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                    : "hover:scale-105 hover:shadow-md"
                }`}
              >
                <span className="text-2xl">{style.emoji}</span>
                <span>{style.label}</span>
              </Button>
            ))}
          </div>

          {selectedHairStyle === "other" && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="customHairStyle" className="text-lg">Custom Hair Style</Label>
              <Input
                id="customHairStyle"
                value={customHairStyle}
                onChange={(e) => onCustomHairStyleChange(e.target.value)}
                placeholder="Describe your custom hair style..."
                className="p-4 text-lg"
              />
            </div>
          )}
        </div>

        {/* Hair Color Selection */}
        <div className="space-y-3">
          <Label className="text-lg">Hair Colour</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {HAIR_COLOR_OPTIONS.map(color => (
              <Button
                key={color.value}
                variant={selectedHairColor === color.value ? "default" : "outline"}
                onClick={() => onHairColorChange(color.value)}
                className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                  selectedHairColor === color.value 
                    ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                    : "hover:scale-105 hover:shadow-md"
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${color.color}`}></div>
                <span>{color.label}</span>
              </Button>
            ))}
          </div>

          {selectedHairColor === "other" && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="customHairColor" className="text-lg">Custom Hair Colour</Label>
              <Input
                id="customHairColor"
                value={customHairColor}
                onChange={(e) => onCustomHairColorChange(e.target.value)}
                placeholder="Describe your custom hair colour..."
                className="p-4 text-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppearanceHairStep;
