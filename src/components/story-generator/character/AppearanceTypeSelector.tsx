
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
import { CHARACTER_TYPE_OPTIONS } from "./AppearanceForm";

interface AppearanceTypeSelectorProps {
  value: string;
  customValue: string;
  onChange: (value: string) => void;
  onCustomChange: (value: string) => void;
}

const AppearanceTypeSelector: React.FC<AppearanceTypeSelectorProps> = ({
  value,
  customValue,
  onChange,
  onCustomChange
}) => (
  <div className="space-y-2">
    <Label htmlFor="characterType" className="text-lg">Character Type</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="characterType"
        className="bg-white text-lg p-5 pr-12" // right padding for arrow
      >
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] z-[60]">
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
          placeholder="Type a character type..."
          className="mt-2 p-5 text-lg"
          autoFocus
        />
      )}
    </div>
  </div>
);

export default AppearanceTypeSelector;
