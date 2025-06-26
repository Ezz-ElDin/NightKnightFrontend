
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Role options with emojis - girl empowerment focused
const ROLE_OPTIONS = [
  { value: "Hero", label: "Hero", emoji: "🦸‍♀️" },
  { value: "Villain", label: "Villain", emoji: "😈" },
  { value: "Mentor", label: "Mentor", emoji: "👩‍🏫" },
  { value: "Friend", label: "Friend", emoji: "👯‍♀️" },
  { value: "Sidekick", label: "Sidekick", emoji: "👩‍🔬" },
  { value: "Guide", label: "Guide", emoji: "👩‍✈️" },
];

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  selectedRole, 
  onRoleChange 
}) => {
  return (
    <div className="space-y-6">
      <Label className="text-2xl font-semibold">Role in Story</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ROLE_OPTIONS.map(role => (
          <Button
            key={role.value}
            variant={selectedRole === role.value ? "default" : "outline"}
            onClick={() => onRoleChange(role.value)}
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

export { RoleSelector, ROLE_OPTIONS };
