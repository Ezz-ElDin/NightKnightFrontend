
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
  return (
    <div className="space-y-6">
      <CharacterDisclaimer />
      
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
