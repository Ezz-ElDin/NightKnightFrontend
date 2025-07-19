
import React from "react";
import { Label } from "@/components/ui/label";
import CharacterNameInput from "../CharacterNameInput";
import CharacterDisclaimer from "../CharacterDisclaimer";

interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onNext: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ name, onNameChange, onNext }) => {
  const MAX_LENGTH = 30;
  const isValidName = name.trim().length > 0 && name.length <= MAX_LENGTH;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValidName) {
      onNext();
    }
  };

  const handleNext = () => {
    if (isValidName) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>      
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What's your character's name?</Label>
        <p className="text-gray-600">Give your character a magical name that fits their personality!</p>
        
        <CharacterNameInput
          name={name}
          onNameChange={onNameChange}
        />

        {!isValidName && name.trim().length === 0 && (
          <p className="text-sm text-gray-500">
            💡 Enter a name to continue to the next step
          </p>
        )}
      </div>
      
      <CharacterDisclaimer />
    </div>
  );
};

export default NameStep;
