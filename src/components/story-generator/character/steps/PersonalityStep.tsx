
import React from "react";
import { Label } from "@/components/ui/label";
import { PersonalitySelector } from "../PersonalitySelector";

interface PersonalityStepProps {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
  onNext: () => void;
  characterName?: string;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ 
  selectedTraits, 
  onTraitToggle, 
  onNext,
  characterName 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedTraits.length > 0) {
      onNext();
    }
  };

  const questionText = characterName
    ? `What is ${characterName} like?`
    : "What is your character like?";

  const descriptionText = characterName
    ? `Choose personality traits that describe ${characterName}!`
    : "Choose personality traits that describe your character!";

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">{questionText}</Label>
        <p className="text-gray-600">{descriptionText}</p>
        
        <PersonalitySelector 
          selectedTraits={selectedTraits}
          onTraitToggle={onTraitToggle}
        />
      </div>
    </div>
  );
};

export default PersonalityStep;
