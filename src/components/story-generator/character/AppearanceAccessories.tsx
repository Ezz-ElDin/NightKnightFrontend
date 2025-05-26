
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AppearanceAccessoriesProps {
  accessory1: string;
  accessory2: string;
  onAccessory1Change: (value: string) => void;
  onAccessory2Change: (value: string) => void;
}

const AppearanceAccessories: React.FC<AppearanceAccessoriesProps> = ({
  accessory1,
  accessory2,
  onAccessory1Change,
  onAccessory2Change
}) => (
  <div className="grid grid-cols-2 gap-4">
    {/* Accessory 1 Input */}
    <div className="space-y-2">
      <Label htmlFor="accessory1" className="text-lg">Accessory 1</Label>
      <Input
        id="accessory1"
        value={accessory1}
        onChange={(e) => onAccessory1Change(e.target.value)}
        placeholder="e.g., magic wand, robot arm"
        className="p-5 text-lg"
      />
    </div>
    {/* Accessory 2 Input */}
    <div className="space-y-2">
      <Label htmlFor="accessory2" className="text-lg">Accessory 2</Label>
      <Input
        id="accessory2"
        value={accessory2}
        onChange={(e) => onAccessory2Change(e.target.value)}
        placeholder="e.g., cape, lab coat"
        className="p-5 text-lg"
      />
    </div>
  </div>
);

export default AppearanceAccessories;
