
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const COLOR_OPTIONS = [
  "red", "blue", "green", "yellow", "purple", "pink", 
  "orange", "brown", "black", "white", "gray", "other"
];

interface AppearanceColorStepProps {
  selectedColor: string;
  customColor: string;
  onColorChange: (color: string) => void;
  onCustomColorChange: (customColor: string) => void;
  onAutoAdvance: () => void;
}

const AppearanceColorStep: React.FC<AppearanceColorStepProps> = ({ 
  selectedColor, 
  customColor,
  onColorChange,
  onCustomColorChange,
  onAutoAdvance
}) => {
  const [showCustomInput, setShowCustomInput] = useState(selectedColor === "other");

  const handleColorSelect = (color: string) => {
    onColorChange(color);
    if (color === "other") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setTimeout(() => {
        onAutoAdvance();
      }, 800);
    }
  };

  const handleCustomColorSubmit = () => {
    if (customColor.trim()) {
      setTimeout(() => {
        onAutoAdvance();
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What's their main color?
        </h2>
        <p className="text-muted-foreground">
          Choose a dominant color for your character
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {COLOR_OPTIONS.map(color => (
          <Button
            key={color}
            variant={selectedColor === color ? "default" : "outline"}
            onClick={() => handleColorSelect(color)}
            className={`h-16 p-4 text-sm font-medium transition-all duration-200 capitalize ${
              selectedColor === color 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
            }`}
          >
            {color}
          </Button>
        ))}
      </div>

      {showCustomInput && (
        <div className="space-y-3 mt-6">
          <Label htmlFor="custom-color" className="text-lg font-medium">
            Describe the color:
          </Label>
          <div className="flex gap-2">
            <Input
              id="custom-color"
              value={customColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              placeholder="e.g., emerald, crimson, silver..."
              className="flex-1"
              autoFocus
            />
            <Button 
              onClick={handleCustomColorSubmit}
              disabled={!customColor.trim()}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppearanceColorStep;
