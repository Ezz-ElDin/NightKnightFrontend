import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AGE_OPTIONS = [
  { value: "baby", label: "baby", emoji: "👶" },
  { value: "little", label: "little", emoji: "🧒" },
  { value: "young", label: "young", emoji: "👧" },
  { value: "teen", label: "teen", emoji: "👩‍🎤" },
  { value: "grown-up", label: "grown-up", emoji: "👩‍🚀" },
];

const COLOR_OPTIONS = [
  { value: "golden", label: "golden", emoji: "🟡" },
  { value: "dark", label: "dark", emoji: "⚫" },
  { value: "white", label: "white", emoji: "⚪" },
  { value: "red", label: "red", emoji: "🔴" },
  { value: "blue", label: "blue", emoji: "🔵" },
  { value: "green", label: "green", emoji: "🟢" },
  { value: "brown", label: "brown", emoji: "🟤" },
  { value: "other", label: "other", emoji: "🎨" }
];

const CHARACTER_TYPE_OPTIONS = [
  { value: "girl", label: "girl", emoji: "👸" },
  { value: "boy", label: "boy", emoji: "👦" },
  { value: "man", label: "man", emoji: "👨" },
  { value: "woman", label: "woman", emoji: "👩" },
  { value: "dragon", label: "dragon", emoji: "🐉" },
  { value: "lion", label: "lion", emoji: "🦁" },
  { value: "puppy", label: "puppy", emoji: "🐶" },
  { value: "fairy", label: "fairy", emoji: "🧚‍♀️" },
  { value: "robot", label: "robot", emoji: "🤖" },
  { value: "wizard", label: "wizard", emoji: "🧙‍♀️" },
  { value: "alien", label: "alien", emoji: "👽" },
  { value: "other", label: "other", emoji: "👤" },
];

interface AppearanceFormProps {
  appearanceAge: string;
  onAppearanceAgeChange: (v: string) => void;
  appearanceColor: string;
  onAppearanceColorChange: (v: string) => void;
  appearanceColorCustom: string;
  onAppearanceColorCustomChange: (v: string) => void;

  appearanceType: string;
  onAppearanceTypeChange: (v: string) => void;
  appearanceTypeCustom: string;
  onAppearanceTypeCustomChange: (v: string) => void;

  appearanceAccessory1: string;
  onAppearanceAccessory1Change: (v: string) => void;
  appearanceAccessory2: string;
  onAppearanceAccessory2Change: (v: string) => void;

  generatedAppearance: string;
}

const AppearanceForm: React.FC<AppearanceFormProps> = ({
  appearanceAge,
  onAppearanceAgeChange,
  appearanceColor,
  onAppearanceColorChange,
  appearanceColorCustom,
  onAppearanceColorCustomChange,
  appearanceType,
  onAppearanceTypeChange,
  appearanceTypeCustom,
  onAppearanceTypeCustomChange,
  appearanceAccessory1,
  onAppearanceAccessory1Change,
  appearanceAccessory2,
  onAppearanceAccessory2Change,
  generatedAppearance,
}) => {
  return (
    <div className="space-y-8">
      <Label className="text-2xl font-semibold">What does your character look like?</Label>
      <div className="bg-primary/5 p-8 rounded-2xl space-y-8 border border-primary/20">
        
        {/* Age Selection */}
        <div className="space-y-4">
          <Label className="text-xl font-medium">Age</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {AGE_OPTIONS.map(age => (
              <Button
                key={age.value}
                variant={appearanceAge === age.value ? "default" : "outline"}
                onClick={() => onAppearanceAgeChange(age.value)}
                className={`h-20 p-4 flex flex-col items-center justify-center space-y-1 text-base font-medium transition-all duration-200 ${
                  appearanceAge === age.value 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                    : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="text-2xl">{age.emoji}</span>
                <span className="text-sm">{age.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-4">
          <Label className="text-xl font-medium">Color</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COLOR_OPTIONS.map(color => (
              <Button
                key={color.value}
                variant={appearanceColor === color.value ? "default" : "outline"}
                onClick={() => onAppearanceColorChange(color.value)}
                className={`h-20 p-4 flex flex-col items-center justify-center space-y-1 text-base font-medium transition-all duration-200 ${
                  appearanceColor === color.value 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                    : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="text-2xl">{color.emoji}</span>
                <span className="text-sm">{color.label}</span>
              </Button>
            ))}
          </div>
          {appearanceColor === "other" && (
            <Input 
              value={appearanceColorCustom}
              onChange={(e) => onAppearanceColorCustomChange(e.target.value)}
              placeholder="Type a color..."
              className="mt-4 p-6 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
          )}
        </div>

        {/* Character Type Selection */}
        <div className="space-y-4">
          <Label className="text-xl font-medium">Character Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CHARACTER_TYPE_OPTIONS.map(type => (
              <Button
                key={type.value}
                variant={appearanceType === type.value ? "default" : "outline"}
                onClick={() => onAppearanceTypeChange(type.value)}
                className={`h-20 p-4 flex flex-col items-center justify-center space-y-1 text-base font-medium transition-all duration-200 ${
                  appearanceType === type.value 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                    : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="text-2xl">{type.emoji}</span>
                <span className="text-sm">{type.label}</span>
              </Button>
            ))}
          </div>
          {appearanceType === "other" && (
            <Input 
              value={appearanceTypeCustom}
              onChange={(e) => onAppearanceTypeCustomChange(e.target.value)}
              placeholder="Type a character type..."
              className="mt-4 p-6 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
          )}
        </div>

        {/* Accessories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-xl font-medium">Accessory 1</Label>
            <Input
              value={appearanceAccessory1}
              onChange={(e) => onAppearanceAccessory1Change(e.target.value)}
              placeholder="e.g., magic wand, robot arm"
              className="p-6 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-xl font-medium">Accessory 2</Label>
            <Input
              value={appearanceAccessory2}
              onChange={(e) => onAppearanceAccessory2Change(e.target.value)}
              placeholder="e.g., cape, lab coat"
              className="p-6 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-6 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
          <p className="text-lg text-muted-foreground mb-3 font-medium">Preview:</p>
          <p className="font-semibold text-xl text-purple-700">{generatedAppearance}</p>
        </div>
      </div>
    </div>
  );
};

export { AppearanceForm, AGE_OPTIONS, COLOR_OPTIONS, CHARACTER_TYPE_OPTIONS };
