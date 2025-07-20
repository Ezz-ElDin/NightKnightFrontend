
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const HAIR_STYLE_OPTIONS = [
  { value: "short", label: "Short", emoji: "✂️" },
  { value: "long", label: "Long", emoji: "💇‍♀️" },
  { value: "curly", label: "Curly", emoji: "🌀" },
  { value: "straight", label: "Straight", emoji: "📏" },
  { value: "wavy", label: "Wavy", emoji: "🌊" },
  { value: "braided", label: "Braided", emoji: "🪢" },
  { value: "ponytail", label: "Ponytail", emoji: "🎀" },
  { value: "bald", label: "Bald", emoji: "🥚" },
  { value: "other", label: "Other", emoji: "✏️" },
];

const HAIR_COLOR_OPTIONS = [
  { value: "black", label: "Black", emoji: "⚫" },
  { value: "brown", label: "Brown", emoji: "🤎" },
  { value: "blonde", label: "Blonde", emoji: "💛" },
  { value: "red", label: "Red", emoji: "❤️" },
  { value: "gray", label: "Gray", emoji: "🩶" },
  { value: "white", label: "White", emoji: "🤍" },
  { value: "blue", label: "Blue", emoji: "💙" },
  { value: "green", label: "Green", emoji: "💚" },
  { value: "purple", label: "Purple", emoji: "💜" },
  { value: "pink", label: "Pink", emoji: "🩷" },
  { value: "other", label: "Other", emoji: "✏️" },
];

interface AppearanceHairStepProps {
  selectedHairStyle: string;
  selectedHairColor: string;
  customHairStyle: string;
  customHairColor: string;
  onHairStyleChange: (value: string) => void;
  onHairColorChange: (value: string) => void;
  onCustomHairStyleChange: (value: string) => void;
  onCustomHairColorChange: (value: string) => void;
  onNext: () => void;
  characterName?: string;
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
  characterName,
}) => {
  const displayName = characterName || "your character";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          What does {displayName}'s hair look like?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose {displayName}'s hair style and color to complete their look.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Hair Style */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-700">Hair Style</Label>
          <RadioGroup
            value={selectedHairStyle}
            onValueChange={onHairStyleChange}
            className="grid grid-cols-2 gap-3"
          >
            {HAIR_STYLE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`hair-style-${option.value}`} />
                <Label
                  htmlFor={`hair-style-${option.value}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedHairStyle === "other" && (
            <div className="mt-3">
              <Input
                placeholder="Describe the hair style..."
                value={customHairStyle}
                onChange={(e) => onCustomHairStyleChange(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Hair Color */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-700">Hair Color</Label>
          <RadioGroup
            value={selectedHairColor}
            onValueChange={onHairColorChange}
            className="grid grid-cols-2 gap-3"
          >
            {HAIR_COLOR_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`hair-color-${option.value}`} />
                <Label
                  htmlFor={`hair-color-${option.value}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedHairColor === "other" && (
            <div className="mt-3">
              <Input
                placeholder="Describe the hair color..."
                value={customHairColor}
                onChange={(e) => onCustomHairColorChange(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AppearanceHairStep;
