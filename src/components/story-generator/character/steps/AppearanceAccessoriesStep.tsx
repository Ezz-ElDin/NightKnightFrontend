
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gem } from "lucide-react";

interface AppearanceAccessoriesStepProps {
  accessory1: string;
  accessory2: string;
  onAccessory1Change: (accessory: string) => void;
  onAccessory2Change: (accessory: string) => void;
}

const AppearanceAccessoriesStep: React.FC<AppearanceAccessoriesStepProps> = ({ 
  accessory1, 
  accessory2,
  onAccessory1Change,
  onAccessory2Change
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
          <Gem className="h-8 w-8 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Any special accessories?
        </h2>
        <p className="text-muted-foreground">
          Add special items, clothing, or accessories (optional)
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accessory1" className="text-lg font-medium">
            First Accessory
          </Label>
          <Input
            id="accessory1"
            value={accessory1}
            onChange={(e) => onAccessory1Change(e.target.value)}
            placeholder="e.g., magic wand, crown, cape..."
            className="text-lg p-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessory2" className="text-lg font-medium">
            Second Accessory
          </Label>
          <Input
            id="accessory2"
            value={accessory2}
            onChange={(e) => onAccessory2Change(e.target.value)}
            placeholder="e.g., necklace, boots, sword..."
            className="text-lg p-4"
          />
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        💡 These details help create more vivid story illustrations!
      </div>
    </div>
  );
};

export default AppearanceAccessoriesStep;
