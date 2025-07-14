
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onAutoAdvance: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ 
  name, 
  onNameChange,
  onAutoAdvance
}) => {
  useEffect(() => {
    if (name.trim().length >= 2) {
      const timer = setTimeout(() => {
        onAutoAdvance();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [name, onAutoAdvance]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What's your character's name?
        </h2>
        <p className="text-muted-foreground">
          Give your character a memorable name!
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="character-name" className="text-lg font-medium">
          Character Name
        </Label>
        <Input
          id="character-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter character name..."
          className="text-lg p-6 text-center"
          autoComplete="off"
          autoFocus
        />
        {name.trim().length >= 2 && (
          <p className="text-sm text-green-600 text-center">
            Great! Moving to next step...
          </p>
        )}
      </div>
    </div>
  );
};

export default NameStep;
