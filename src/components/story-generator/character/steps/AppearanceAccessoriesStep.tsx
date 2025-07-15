
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AppearanceAccessoriesStepProps {
  accessory1: string;
  accessory2: string;
  onAccessory1Change: (accessory: string) => void;
  onAccessory2Change: (accessory: string) => void;
  onNext: () => void;
}

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
  { value: "other", label: "Other", emoji: "✨" },
];

const AppearanceAccessoriesStep: React.FC<AppearanceAccessoriesStepProps> = ({ 
  accessory1, 
  accessory2, 
  onAccessory1Change, 
  onAccessory2Change, 
  onNext 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  const handleAccessorySelect = (accessory: string, isFirst: boolean) => {
    if (accessory === "other") {
      return; // Don't select "other" directly, let user type
    }
    
    if (isFirst) {
      onAccessory1Change(accessory);
    } else {
      onAccessory2Change(accessory);
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What accessories does your character have?</Label>
        <p className="text-gray-600">Add special items, clothing, or features that make your character unique!</p>
        
        <div className="space-y-6">
          {/* First Accessory */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">First Accessory</Label>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {ACCESSORY_OPTIONS.map(accessory => (
                <Button
                  key={`first-${accessory.value}`}
                  variant={accessory1 === accessory.value ? "default" : "outline"}
                  onClick={() => handleAccessorySelect(accessory.value, true)}
                  className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-xs transition-all duration-200 ${
                    accessory1 === accessory.value 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                      : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="text-xl">{accessory.emoji}</span>
                  <span className="text-xs">{accessory.label}</span>
                </Button>
              ))}
            </div>
            {(accessory1 === "other" || (!ACCESSORY_OPTIONS.some(opt => opt.value === accessory1) && accessory1)) && (
              <Input
                value={accessory1}
                onChange={(e) => onAccessory1Change(e.target.value)}
                placeholder="e.g., a magical crown, sparkly wings, a special necklace..."
                className="p-4 text-lg"
              />
            )}
          </div>

          {/* Second Accessory */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Second Accessory</Label>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {ACCESSORY_OPTIONS.map(accessory => (
                <Button
                  key={`second-${accessory.value}`}
                  variant={accessory2 === accessory.value ? "default" : "outline"}
                  onClick={() => handleAccessorySelect(accessory.value, false)}
                  className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-xs transition-all duration-200 ${
                    accessory2 === accessory.value 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                      : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="text-xl">{accessory.emoji}</span>
                  <span className="text-xs">{accessory.label}</span>
                </Button>
              ))}
            </div>
            {(accessory2 === "other" || (!ACCESSORY_OPTIONS.some(opt => opt.value === accessory2) && accessory2)) && (
              <Input
                value={accessory2}
                onChange={(e) => onAccessory2Change(e.target.value)}
                placeholder="e.g., a flowing cape, golden shoes, a magic wand..."
                className="p-4 text-lg"
              />
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Click on emoji props to select them quickly, or choose "Other" to describe something unique!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppearanceAccessoriesStep;
