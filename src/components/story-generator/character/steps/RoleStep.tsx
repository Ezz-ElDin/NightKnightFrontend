
import React from "react";
import { Button } from "@/components/ui/button";
import { ROLE_OPTIONS } from "../RoleSelector";

interface RoleStepProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onAutoAdvance: () => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ 
  selectedRole, 
  onRoleChange,
  onAutoAdvance
}) => {
  const handleRoleSelect = (role: string) => {
    onRoleChange(role);
    setTimeout(() => {
      onAutoAdvance();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What role will they play?
        </h2>
        <p className="text-muted-foreground">
          Choose your character's role in the story
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ROLE_OPTIONS.map(role => (
          <Button
            key={role.value}
            variant={selectedRole === role.value ? "default" : "outline"}
            onClick={() => handleRoleSelect(role.value)}
            className={`h-24 p-6 flex flex-col items-center justify-center space-y-2 text-lg font-medium transition-all duration-200 ${
              selectedRole === role.value 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
            }`}
          >
            <span className="text-4xl">{role.emoji}</span>
            <span>{role.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RoleStep;
