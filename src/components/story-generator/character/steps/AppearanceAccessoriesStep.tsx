
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AppearanceAccessoriesStepProps {
  accessory1: string;
  accessory2: string;
  onAccessory1Change: (accessory: string) => void;
  onAccessory2Change: (accessory: string) => void;
  onNext: () => void;
}

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

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What accessories does your character have?</Label>
        <p className="text-gray-600">Add special items, clothing, or features that make your character unique! (Optional)</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessory1" className="text-lg">First Accessory</Label>
            <Input
              id="accessory1"
              value={accessory1}
              onChange={(e) => onAccessory1Change(e.target.value)}
              placeholder="e.g., a magical crown, sparkly wings, a special necklace..."
              className="p-4 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessory2" className="text-lg">Second Accessory</Label>
            <Input
              id="accessory2"
              value={accessory2}
              onChange={(e) => onAccessory2Change(e.target.value)}
              placeholder="e.g., a flowing cape, golden shoes, a magic wand..."
              className="p-4 text-lg"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Think about what makes your character special! Do they wear something magical? Do they have special features like wings or a tail?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppearanceAccessoriesStep;
