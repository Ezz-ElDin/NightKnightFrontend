
import React from "react";
import { Label } from "@/components/ui/label";
import PersonalitySelector from "../PersonalitySelector";

interface PersonalityStepProps {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
  onNext: () => void;
  characterName: string;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ selectedTraits, onTraitToggle, onNext, characterName }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What's {characterName}'s personality?</Label>
        <p className="text-gray-600">Choose traits that make {characterName} unique and interesting!</p>
        
        <PersonalitySelector
          selectedTraits={selectedTraits}
          onTraitToggle={onTraitToggle}
        />
      </div>
    </div>
  );
};

export default PersonalityStep;
