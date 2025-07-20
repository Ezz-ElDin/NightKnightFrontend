
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppearanceTypeStepProps {
  selectedType: string;
  customType: string;
  onTypeChange: (type: string) => void;
  onCustomTypeChange: (type: string) => void;
  onNext: () => void;
  characterName: string;
}

const TYPE_OPTIONS = [
  { value: "princess", label: "Princess", emoji: "👸" },
  { value: "knight", label: "Knight", emoji: "🛡️" },
  { value: "wizard", label: "Wizard", emoji: "🧙‍♂️" },
  { value: "fairy", label: "Fairy", emoji: "🧚‍♀️" },
  { value: "dragon", label: "Dragon", emoji: "🐉" },
  { value: "unicorn", label: "Unicorn", emoji: "🦄" },
  { value: "cat", label: "Cat", emoji: "🐱" },
  { value: "dog", label: "Dog", emoji: "🐶" },
  { value: "bear", label: "Bear", emoji: "🐻" },
  { value: "rabbit", label: "Rabbit", emoji: "🐰" },
  { value: "fox", label: "Fox", emoji: "🦊" },
  { value: "bird", label: "Bird", emoji: "🐦" },
  { value: "mermaid", label: "Mermaid", emoji: "🧜‍♀️" },
  { value: "robot", label: "Robot", emoji: "🤖" },
  { value: "alien", label: "Alien", emoji: "👽" },
  { value: "other", label: "Other", emoji: "✨" },
];

const AppearanceTypeStep: React.FC<AppearanceTypeStepProps> = ({ 
  selectedType, 
  customType, 
  onTypeChange, 
  onCustomTypeChange, 
  onNext,
  characterName
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedType) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What type of character is {characterName}?</Label>
        <p className="text-gray-600">Choose what kind of being {characterName} is!</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TYPE_OPTIONS.map(type => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              onClick={() => onTypeChange(type.value)}
              className={`h-20 p-3 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                selectedType === type.value 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                  : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
              }`}
            >
              <span className="text-2xl">{type.emoji}</span>
              <span>{type.label}</span>
            </Button>
          ))}
        </div>

        {selectedType === "other" && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="customType" className="text-lg">Custom Type</Label>
            <Input
              id="customType"
              value={customType}
              onChange={(e) => onCustomTypeChange(e.target.value)}
              placeholder="Describe what type of character this is..."
              className="p-4 text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceTypeStep;
