
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const COLOR_OPTIONS = [
  { value: "fair", label: "Fair" },
  { value: "light", label: "Light" },
  { value: "olive", label: "Olive" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
  { value: "tan", label: "Tan" },
  { value: "pale", label: "Pale" },
  { value: "golden", label: "Golden" },
  { value: "rosy", label: "Rosy" },
  { value: "peachy", label: "Peachy" },
  { value: "other", label: "Other" },
];

interface AppearanceColorStepProps {
  selectedColor: string;
  customColor: string;
  onColorChange: (color: string) => void;
  onCustomColorChange: (color: string) => void;
  onNext: () => void;
}

const AppearanceColorStep: React.FC<AppearanceColorStepProps> = ({
  selectedColor,
  customColor,
  onColorChange,
  onCustomColorChange,
  onNext,
}) => {
  const handleColorSelect = (color: string) => {
    onColorChange(color);
  };

  const isValid = selectedColor && (selectedColor !== "other" || customColor.trim());

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          What colour is your character's skin?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the skin colour that matches your character
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {COLOR_OPTIONS.map((color) => (
          <Button
            key={color.value}
            variant={selectedColor === color.value ? "default" : "outline"}
            className="h-16 text-lg font-medium"
            onClick={() => handleColorSelect(color.value)}
          >
            {color.label}
          </Button>
        ))}
      </div>

      {selectedColor === "other" && (
        <div className="space-y-2">
          <Label htmlFor="custom-color">Custom skin colour</Label>
          <Input
            id="custom-color"
            type="text"
            placeholder="Enter custom colour..."
            value={customColor}
            onChange={(e) => onCustomColorChange(e.target.value)}
            className="text-lg"
          />
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button
          onClick={onNext}
          disabled={!isValid}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AppearanceColorStep;
