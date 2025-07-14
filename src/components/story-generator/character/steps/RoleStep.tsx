
import React from "react";
import { Label } from "@/components/ui/label";
import { RoleSelector } from "../RoleSelector";

interface RoleStepProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onNext: () => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ selectedRole, onRoleChange, onNext }) => {
  const handleRoleChange = (role: string) => {
    onRoleChange(role);
    // Auto-advance when role is selected
    if (role !== selectedRole) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What role does your character play?</Label>
        <p className="text-gray-600">Choose how your character fits into the story!</p>
        
        <RoleSelector 
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
        />
      </div>
    </div>
  );
};

export default RoleStep;
