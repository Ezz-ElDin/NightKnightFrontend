
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ACCESSORY_OPTIONS = [
  { value: "crown", label: "Crown", emoji: "👑" },
  { value: "hat", label: "Hat", emoji: "🎩" },
  { value: "glasses", label: "Glasses", emoji: "👓" },
  { value: "necklace", label: "Necklace", emoji: "📿" },
  { value: "cape", label: "Cape", emoji: "🦸" },
  { value: "wings", label: "Wings", emoji: "🪶" },
  { value: "sword", label: "Sword", emoji: "⚔️" },
  { value: "wand", label: "Wand", emoji: "🪄" },
  { value: "shield", label: "Shield", emoji: "🛡️" },
  { value: "bow", label: "Bow", emoji: "🏹" },
  { value: "backpack", label: "Backpack", emoji: "🎒" },
  { value: "boots", label: "Boots", emoji: "👢" },
  { value: "scarf", label: "Scarf", emoji: "🧣" },
  { value: "gloves", label: "Gloves", emoji: "🧤" },
  { value: "belt", label: "Belt", emoji: "👓" },
];

interface AppearanceAccessoriesStepProps {
  accessories: string[];
  onAccessoriesChange: (accessories: string[]) => void;
  onNext: () => void;
  characterName?: string;
}

const AppearanceAccessoriesStep: React.FC<AppearanceAccessoriesStepProps> = ({
  accessories,
  onAccessoriesChange,
  onNext,
  characterName,
}) => {
  const displayName = characterName || "your character";

  const handleAccessoryToggle = (accessory: string, checked: boolean) => {
    if (checked) {
      onAccessoriesChange([...accessories, accessory]);
    } else {
      onAccessoriesChange(accessories.filter((a) => a !== accessory));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          What accessories does {displayName} have?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose any accessories that {displayName} might wear or carry. You can select multiple items or none at all.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ACCESSORY_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
            <Checkbox
              id={`accessory-${option.value}`}
              checked={accessories.includes(option.value)}
              onCheckedChange={(checked) => 
                handleAccessoryToggle(option.value, checked as boolean)
              }
            />
            <Label
              htmlFor={`accessory-${option.value}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-xl">{option.emoji}</span>
              <span>{option.label}</span>
            </Label>
          </div>
        ))}
      </div>

      {accessories.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          Selected: {accessories.length} {accessories.length === 1 ? 'accessory' : 'accessories'}
        </div>
      )}

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

export default AppearanceAccessoriesStep;
