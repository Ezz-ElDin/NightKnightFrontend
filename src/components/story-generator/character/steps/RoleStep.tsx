
import React from "react";
import { Label } from "@/components/ui/label";
import { RoleSelector } from "../RoleSelector";

interface RoleStepProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onNext: () => void;
  characterName?: string;
}

const RoleStep: React.FC<RoleStepProps> = ({ selectedRole, onRoleChange, onNext, characterName }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedRole) {
      onNext();
    }
  };

  const questionText = characterName 
    ? `What role does ${characterName} play?`
    : "What role does your character play?";

  const descriptionText = characterName
    ? `Choose how ${characterName} fits into the story!`
    : "Choose how your character fits into the story!";

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">{questionText}</Label>
        <p className="text-gray-600">{descriptionText}</p>
        
        <RoleSelector 
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
        />
      </div>
    </div>
  );
};

export default RoleStep;
