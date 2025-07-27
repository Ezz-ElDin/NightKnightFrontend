
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

const COLOR_OPTIONS = [
  { value: "red", label: "Red", color: "#ef4444" },
  { value: "blue", label: "Blue", color: "#3b82f6" },
  { value: "green", label: "Green", color: "#22c55e" },
  { value: "yellow", label: "Yellow", color: "#eab308" },
  { value: "purple", label: "Purple", color: "#a855f7" },
  { value: "pink", label: "Pink", color: "#ec4899" },
  { value: "orange", label: "Orange", color: "#f97316" },
  { value: "black", label: "Black", color: "#000000" },
  { value: "white", label: "White", color: "#ffffff" },
  { value: "brown", label: "Brown", color: "#a3a3a3" },
  { value: "gold", label: "Gold", color: "#fbbf24" },
  { value: "silver", label: "Silver", color: "#d1d5db" },
];

const AppearanceAccessoriesStep: React.FC<AppearanceAccessoriesStepProps> = ({ 
  accessories, 
  onAccessoriesChange, 
  onNext,
  characterName
}) => {
  const [customAccessory, setCustomAccessory] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [accessoryColors, setAccessoryColors] = React.useState<{[key: string]: string}>({});

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
          ACCESSORY_OPTIONS.some(opt => opt.value === acc.split(':')[0])
        );
        onAccessoriesChange(predefinedAccessories);
      } else {
        // Selecting "other" - show input
        setShowCustomInput(true);
      }
      return;
    }
    
    const accessoryKey = accessory.split(':')[0]; // Get base accessory name
    const isSelected = accessories.some(acc => acc.split(':')[0] === accessoryKey);
    
    if (isSelected) {
      // Remove accessory and its color
      const newAccessories = accessories.filter(acc => acc.split(':')[0] !== accessoryKey);
      onAccessoriesChange(newAccessories);
      
      // Remove color from state
      const newColors = { ...accessoryColors };
      delete newColors[accessoryKey];
      setAccessoryColors(newColors);
    } else {
      // Add accessory without color initially
      onAccessoriesChange([...accessories, accessory]);
    }
  };

  const handleColorSelect = (accessoryKey: string, color: string) => {
    setAccessoryColors(prev => ({
      ...prev,
      [accessoryKey]: color
    }));

    // Update the accessories array to include the color
    const newAccessories = accessories.map(acc => {
      const baseKey = acc.split(':')[0];
      if (baseKey === accessoryKey) {
        return `${baseKey}:${color}`;
      }
      return acc;
    });
    
    onAccessoriesChange(newAccessories);
  };

  const handleCustomAccessoryChange = (value: string) => {
    setCustomAccessory(value);
    
    // Remove any previous custom accessories and add the new one
    const predefinedAccessories = accessories.filter(acc => 
      ACCESSORY_OPTIONS.some(opt => opt.value === acc.split(':')[0])
    );
    
    if (value.trim()) {
      onAccessoriesChange([...predefinedAccessories, value.trim()]);
    } else {
      onAccessoriesChange(predefinedAccessories);
    }
  };

  const getSelectedAccessories = () => {
    return accessories.filter(acc => 
      ACCESSORY_OPTIONS.some(opt => opt.value === acc.split(':')[0])
    );
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What accessories does {characterName} have?</Label>
        <p className="text-gray-600">Add special items, clothing, or features that make {characterName} unique!</p>
        
        <div className="space-y-4">
          <Label className="text-lg font-medium">Select Accessories (you can choose multiple)</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {ACCESSORY_OPTIONS.map(accessory => {
              const isSelected = accessories.some(acc => acc.split(':')[0] === accessory.value) || 
                               (accessory.value === "other" && showCustomInput);
              
              return (
                <Button
                  key={accessory.value}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleAccessoryToggle(accessory.value)}
                  className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                      : "hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <span className="text-2xl">{accessory.emoji}</span>
                  <span className="text-xs">{accessory.label}</span>
                </Button>
              );
            })}
          </div>
          
          {showCustomInput && (
            <Input
              value={customAccessory}
              onChange={(e) => handleCustomAccessoryChange(e.target.value)}
              placeholder="e.g., a magical crown, sparkly wings, a special necklace..."
              className="p-4 text-lg"
            />
          )}

          {/* Color selection for selected accessories */}
          {getSelectedAccessories().length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Choose colors for your accessories:</Label>
              <div className="space-y-2">
                {getSelectedAccessories().map(accessoryFull => {
                  const accessoryKey = accessoryFull.split(':')[0];
                  const selectedColor = accessoryFull.split(':')[1];
                  const accessoryOption = ACCESSORY_OPTIONS.find(opt => opt.value === accessoryKey);
                  
                  if (!accessoryOption) return null;
                  
                  return (
                    <div key={accessoryKey} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <span className="text-lg">{accessoryOption.emoji}</span>
                      <span className="text-sm font-medium min-w-16">{accessoryOption.label}</span>
                      <div className="flex gap-1">
                        {COLOR_OPTIONS.map(color => (
                          <button
                            key={color.value}
                            onClick={() => handleColorSelect(accessoryKey, color.value)}
                            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                              selectedColor === color.value 
                                ? "border-purple-500 scale-110 shadow-md" 
                                : "border-gray-300 hover:border-gray-400 hover:scale-105"
                            }`}
                            style={{ backgroundColor: color.color }}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Click on emoji props to select them, then choose a color from the small dots that appear below!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppearanceAccessoriesStep;
