
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
import { COLOR_OPTIONS } from "./AppearanceForm";

interface AppearanceColorSelectorProps {
  value: string;
  customValue: string;
  onChange: (value: string) => void;
  onCustomChange: (value: string) => void;
}

const AppearanceColorSelector: React.FC<AppearanceColorSelectorProps> = ({
  value,
  customValue,
  onChange,
  onCustomChange
}) => (
  <div className="space-y-2">
    <Label htmlFor="color" className="text-lg">Color</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="color"
        className="bg-white text-lg p-5 pr-12" // right padding for arrow
      >
        <SelectValue placeholder="Select color" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] z-[60]">
        {COLOR_OPTIONS.map(color => (
          <SelectItem 
            key={color} 
            value={color} 
            className={
              color === "other" 
              ? "text-lg p-3 bg-yellow-100 text-yellow-900 hover:bg-yellow-200" 
              : "text-lg p-3"
            }
          >
            {color}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {/* Smooth appear/disappear without glitches */}
    <div
      className={`overflow-hidden transition-all duration-300`}
      style={{
        maxHeight: value === "other" ? 100 : 0,
        opacity: value === "other" ? 1 : 0,
        pointerEvents: value === "other" ? "auto" : "none"
      }}
    >
      {value === "other" && (
        <Input
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Type a color..."
          className="mt-2 p-5 text-lg"
          autoFocus
        />
      )}
    </div>
  </div>
);

export default AppearanceColorSelector;
