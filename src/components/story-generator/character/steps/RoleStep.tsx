
import React from "react";
import { Label } from "@/components/ui/label";
import { RoleSelector } from "../RoleSelector";

interface RoleStepProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onNext: () => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ selectedRole, onRoleChange, onNext }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedRole) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What role does your character play?</Label>
        <p className="text-gray-600">Choose how your character fits into the story!</p>
        
        <RoleSelector 
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
        />
      </div>
    </div>
  );
};

export default RoleStep;
