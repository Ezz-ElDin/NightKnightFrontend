
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AppearanceAccessoriesStepProps {
  accessories: string[];
  onAccessoriesChange: (accessories: string[]) => void;
  onNext: () => void;
  characterName: string;
}

const ACCESSORY_OPTIONS = [
  { value: "crown", label: "Crown", emoji: "👑", verb: "wearing" },
  { value: "hat", label: "Hat", emoji: "🎩", verb: "wearing" },
  { value: "glasses", label: "Glasses", emoji: "👓", verb: "wearing" },
  { value: "necklace", label: "Necklace", emoji: "📿", verb: "wearing" },
  { value: "cape", label: "Cape", emoji: "🦸", verb: "wearing" },
  { value: "wings", label: "Wings", emoji: "🪶", verb: "having" },
  { value: "sword", label: "Sword", emoji: "⚔️", verb: "holding" },
  { value: "wand", label: "Wand", emoji: "🪄", verb: "holding" },
  { value: "shield", label: "Shield", emoji: "🛡️", verb: "holding" },
  { value: "bow", label: "Bow", emoji: "🏹", verb: "holding" },
  { value: "backpack", label: "Backpack", emoji: "🎒", verb: "wearing" },
  { value: "boots", label: "Boots", emoji: "👢", verb: "wearing" },
  { value: "scarf", label: "Scarf", emoji: "🧣", verb: "wearing" },
  { value: "gloves", label: "Gloves", emoji: "🧤", verb: "wearing" },
  { value: "headphones", label: "Headphones", emoji: "🎧", verb: "wearing" },
  { value: "other", label: "Other", emoji: "✨", verb: "having" },
];

const AppearanceAccessoriesStep: React.FC<AppearanceAccessoriesStepProps> = ({ 
  accessories, 
  onAccessoriesChange, 
  onNext,
  characterName
}) => {
  const [customAccessory, setCustomAccessory] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  const handleAccessoryToggle = (accessory: string) => {
    if (accessory === "other") {
      if (showCustomInput) {
        // Deselecting "other" - hide input and remove custom accessory
        setShowCustomInput(false);
        setCustomAccessory("");
        // Remove any custom accessories from the list
        const predefinedAccessories = accessories.filter(acc => 
          ACCESSORY_OPTIONS.some(opt => opt.value === acc)
        );
        onAccessoriesChange(predefinedAccessories);
      } else {
        // Selecting "other" - show input
        setShowCustomInput(true);
      }
      return;
    }
    
    if (accessories.includes(accessory)) {
      onAccessoriesChange(accessories.filter(a => a !== accessory));
    } else {
      onAccessoriesChange([...accessories, accessory]);
    }
  };

  const handleCustomAccessoryChange = (value: string) => {
    setCustomAccessory(value);
    
    // Remove any previous custom accessories and add the new one
    const predefinedAccessories = accessories.filter(acc => 
      ACCESSORY_OPTIONS.some(opt => opt.value === acc)
    );
    
    if (value.trim()) {
      onAccessoriesChange([...predefinedAccessories, value.trim()]);
    } else {
      onAccessoriesChange(predefinedAccessories);
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What accessories does {characterName} have?</Label>
        <p className="text-gray-600">Add special items, clothing, or features that make {characterName} unique!</p>
        
        <div className="space-y-4">
          <Label className="text-lg font-medium">Select Accessories (you can choose multiple)</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {ACCESSORY_OPTIONS.map(accessory => (
              <Button
                key={accessory.value}
                variant={accessories.includes(accessory.value) || (accessory.value === "other" && showCustomInput) ? "default" : "outline"}
                onClick={() => handleAccessoryToggle(accessory.value)}
                className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                  accessories.includes(accessory.value) || (accessory.value === "other" && showCustomInput)
                    ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                    : "hover:scale-105 hover:shadow-md"
                }`}
              >
                <span className="text-2xl">{accessory.emoji}</span>
                <span className="text-xs">{accessory.label}</span>
              </Button>
            ))}
          </div>
          
          {showCustomInput && (
            <Input
              value={customAccessory}
              onChange={(e) => handleCustomAccessoryChange(e.target.value)}
              placeholder="e.g., a magical crown, sparkly wings, a special necklace..."
              className="p-4 text-lg"
            />
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Click on emoji props to select them (you can choose multiple), or choose "Other" to describe something unique!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppearanceAccessoriesStep;
