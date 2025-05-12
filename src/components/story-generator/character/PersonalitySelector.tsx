
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PERSONALITY_TRAITS } from "../constants";

interface PersonalitySelectorProps {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({ 
  selectedTraits, 
  onTraitToggle 
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-lg">Personality Traits</Label>
      <div className="grid grid-cols-2 gap-3 bg-primary/5 p-6 rounded-xl border border-primary/20">
        {PERSONALITY_TRAITS.map(trait => (
          <div key={trait} className="flex items-center space-x-3">
            <Checkbox 
              id={`trait-${trait}`}
              checked={selectedTraits.includes(trait)}
              onCheckedChange={() => onTraitToggle(trait)}
              className="w-6 h-6" 
            />
            <label 
              htmlFor={`trait-${trait}`}
              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {trait}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalitySelector;
