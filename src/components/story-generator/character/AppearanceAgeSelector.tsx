
import React from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { AGE_OPTIONS } from "./AppearanceForm";

interface AppearanceAgeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const AppearanceAgeSelector: React.FC<AppearanceAgeSelectorProps> = ({ value, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor="age" className="text-lg">Age</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="age"
        className="bg-white text-lg p-5 pr-12" // right padding for arrow
      >
        <SelectValue placeholder="Select age" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {AGE_OPTIONS.map(age => (
          <SelectItem key={age.value} value={age.value} className="text-lg p-3">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{age.emoji}</span>
              <span>{age.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default AppearanceAgeSelector;
