
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const AGE_OPTIONS = [
  { value: "baby", label: "baby", emoji: "👶" },
  { value: "little", label: "little", emoji: "🧒" },
  { value: "young", label: "young", emoji: "👧" },
  { value: "teen", label: "teen", emoji: "👩‍🎤" },
  { value: "grown-up", label: "grown-up", emoji: "👩‍🚀" },
];

const COLOR_OPTIONS = ["golden", "dark", "white", "red", "blue", "green", "brown", "other"];

const CHARACTER_TYPE_OPTIONS = [
  { value: "girl", label: "girl", emoji: "👸" },
  { value: "boy", label: "boy", emoji: "👦" },
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
    <div className="space-y-4">
      <Label className="text-lg">What does your character look like?</Label>
      <div className="bg-primary/5 p-6 rounded-xl space-y-5 border border-primary/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg">Age</Label>
            <Select 
              value={appearanceAge}
              onValueChange={onAppearanceAgeChange}
            >
              <SelectTrigger id="age" className="bg-white text-lg p-5">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {AGE_OPTIONS.map(age => (
                  <SelectItem key={age.value} value={age.value} className="text-lg p-3">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{age.emoji}</span>
                      <span>{age.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color" className="text-lg">Color</Label>
            <Select 
              value={appearanceColor}
              onValueChange={onAppearanceColorChange}
            >
              <SelectTrigger id="color" className="bg-white text-lg p-5">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {COLOR_OPTIONS.map(color => (
                  <SelectItem key={color} value={color} className="text-lg p-3">
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {appearanceColor === "other" && (
              <Input 
                value={appearanceColorCustom}
                onChange={(e) => onAppearanceColorCustomChange(e.target.value)}
                placeholder="Type a color..."
                className="mt-2 p-5 text-lg"
              />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="characterType" className="text-lg">Character Type</Label>
          <Select 
            value={appearanceType}
            onValueChange={onAppearanceTypeChange}
          >
            <SelectTrigger id="characterType" className="bg-white text-lg p-5">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {CHARACTER_TYPE_OPTIONS.map(type => (
                <SelectItem key={type.value} value={type.value} className="text-lg p-3">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{type.emoji}</span>
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {appearanceType === "other" && (
            <Input 
              value={appearanceTypeCustom}
              onChange={(e) => onAppearanceTypeCustomChange(e.target.value)}
              placeholder="Type a character type..."
              className="mt-2 p-5 text-lg"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accessory1" className="text-lg">Accessory 1</Label>
            <Input
              id="accessory1"
              value={appearanceAccessory1}
              onChange={(e) => onAppearanceAccessory1Change(e.target.value)}
              placeholder="e.g., magic wand, robot arm"
              className="p-5 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accessory2" className="text-lg">Accessory 2</Label>
            <Input
              id="accessory2"
              value={appearanceAccessory2}
              onChange={(e) => onAppearanceAccessory2Change(e.target.value)}
              placeholder="e.g., cape, lab coat"
              className="p-5 text-lg"
            />
          </div>
        </div>
        <div className="mt-4 p-5 bg-white rounded-xl border shadow-sm">
          <p className="text-md text-muted-foreground mb-2">Preview:</p>
          <p className="font-medium text-lg">{generatedAppearance}</p>
        </div>
      </div>
    </div>
  );
};

export { AppearanceForm, AGE_OPTIONS, COLOR_OPTIONS, CHARACTER_TYPE_OPTIONS };
