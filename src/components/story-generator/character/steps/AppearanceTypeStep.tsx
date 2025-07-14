
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TYPE_OPTIONS = [
  "human", "cat", "dog", "dragon", "fairy", "robot",
  "monster", "alien", "wizard", "knight", "princess", "other"
];

interface AppearanceTypeStepProps {
  selectedType: string;
  customType: string;
  onTypeChange: (type: string) => void;
  onCustomTypeChange: (customType: string) => void;
  onAutoAdvance: () => void;
}

const AppearanceTypeStep: React.FC<AppearanceTypeStepProps> = ({ 
  selectedType, 
  customType,
  onTypeChange,
  onCustomTypeChange,
  onAutoAdvance
}) => {
  const [showCustomInput, setShowCustomInput] = useState(selectedType === "other");

  const handleTypeSelect = (type: string) => {
    onTypeChange(type);
    if (type === "other") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setTimeout(() => {
        onAutoAdvance();
      }, 800);
    }
  };

  const handleCustomTypeSubmit = () => {
    if (customType.trim()) {
      setTimeout(() => {
        onAutoAdvance();
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What type of character are they?
        </h2>
        <p className="text-muted-foreground">
          Choose what kind of being your character is
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {TYPE_OPTIONS.map(type => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => handleTypeSelect(type)}
            className={`h-16 p-4 text-sm font-medium transition-all duration-200 capitalize ${
              selectedType === type 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      {showCustomInput && (
        <div className="space-y-3 mt-6">
          <Label htmlFor="custom-type" className="text-lg font-medium">
            Describe the character type:
          </Label>
          <div className="flex gap-2">
            <Input
              id="custom-type"
              value={customType}
              onChange={(e) => onCustomTypeChange(e.target.value)}
              placeholder="e.g., unicorn, phoenix, mermaid..."
              className="flex-1"
              autoFocus
            />
            <Button 
              onClick={handleCustomTypeSubmit}
              disabled={!customType.trim()}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppearanceTypeStep;
