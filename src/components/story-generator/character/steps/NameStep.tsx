
import React from "react";
import { Label } from "@/components/ui/label";
import CharacterNameInput from "../CharacterNameInput";

interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onNext: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ name, onNameChange, onNext }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
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
      </div>
    </div>
  );
};

export default NameStep;
