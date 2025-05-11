
import React from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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
    <div className="space-y-2">
      <Label htmlFor="role" className="text-lg">Role in Story</Label>
      <Select
        value={selectedRole}
        onValueChange={onRoleChange}
      >
        <SelectTrigger id="role" className="bg-white text-lg p-6">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {ROLE_OPTIONS.map(role => (
            <SelectItem key={role.value} value={role.value} className="text-lg p-3">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{role.emoji}</span>
                <span>{role.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { RoleSelector, ROLE_OPTIONS };
