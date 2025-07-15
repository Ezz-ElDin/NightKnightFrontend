
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HAIR_STYLE_OPTIONS = [
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
  { value: "curly", label: "Curly" },
  { value: "straight", label: "Straight" },
  { value: "wavy", label: "Wavy" },
  { value: "braided", label: "Braided" },
  { value: "spiky", label: "Spiky" },
  { value: "bald", label: "Bald" },
  { value: "other", label: "Other" },
];

const HAIR_COLOR_OPTIONS = [
  { value: "black", label: "Black" },
  { value: "brown", label: "Brown" },
  { value: "blonde", label: "Blonde" },
  { value: "red", label: "Red" },
  { value: "grey", label: "Grey" },
  { value: "white", label: "White" },
  { value: "auburn", label: "Auburn" },
  { value: "ginger", label: "Ginger" },
  { value: "other", label: "Other" },
];

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

const AppearanceHairStep: React.FC<AppearanceHairStepProps> = ({
  selectedHairStyle,
  selectedHairColor,
  customHairStyle,
  customHairColor,
  onHairStyleChange,
  onHairColorChange,
  onCustomHairStyleChange,
  onCustomHairColorChange,
  onNext,
}) => {
  const handleHairStyleSelect = (style: string) => {
    onHairStyleChange(style);
  };

  const handleHairColorSelect = (color: string) => {
    onHairColorChange(color);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          What does your character's hair look like?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the hair style and colour for your character
        </p>
      </div>

      {/* Hair Style Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Hair Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {HAIR_STYLE_OPTIONS.map((style) => (
            <Button
              key={style.value}
              variant={selectedHairStyle === style.value ? "default" : "outline"}
              className="h-16 text-lg font-medium"
              onClick={() => handleHairStyleSelect(style.value)}
            >
              {style.label}
            </Button>
          ))}
        </div>

        {selectedHairStyle === "other" && (
          <div className="space-y-2">
            <Label htmlFor="custom-hair-style">Custom hair style</Label>
            <Input
              id="custom-hair-style"
              type="text"
              placeholder="Enter custom style..."
              value={customHairStyle}
              onChange={(e) => onCustomHairStyleChange(e.target.value)}
              className="text-lg"
            />
          </div>
        )}
      </div>

      {/* Hair Color Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Hair Colour</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {HAIR_COLOR_OPTIONS.map((color) => (
            <Button
              key={color.value}
              variant={selectedHairColor === color.value ? "default" : "outline"}
              className="h-16 text-lg font-medium"
              onClick={() => handleHairColorSelect(color.value)}
            >
              {color.label}
            </Button>
          ))}
        </div>

        {selectedHairColor === "other" && (
          <div className="space-y-2">
            <Label htmlFor="custom-hair-color">Custom hair colour</Label>
            <Input
              id="custom-hair-color"
              type="text"
              placeholder="Enter custom colour..."
              value={customHairColor}
              onChange={(e) => onCustomHairColorChange(e.target.value)}
              className="text-lg"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={onNext}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AppearanceHairStep;
