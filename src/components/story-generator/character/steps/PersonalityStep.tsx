
import React from "react";
import { Label } from "@/components/ui/label";
import PersonalitySelector from "../PersonalitySelector";

interface PersonalityStepProps {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ selectedTraits, onTraitToggle }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What's your character's personality?</Label>
        <p className="text-gray-600">Choose traits that make your character unique and interesting!</p>
        
        <PersonalitySelector
          selectedTraits={selectedTraits}
          onTraitToggle={onTraitToggle}
        />
      </div>
    </div>
  );
};

export default PersonalityStep;
