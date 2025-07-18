
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CharacterNameInputProps {
  name: string;
  onNameChange: (name: string) => void;
}

const CharacterNameInput: React.FC<CharacterNameInputProps> = ({ 
  name, 
  onNameChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="characterName" className="text-lg">Name</Label>
      <Input
        id="characterName"
        value={name}
        onChange={handleChange}
        placeholder="What's this character called?"
        className="p-6 text-lg"
      />
    </div>
  );
};

export default CharacterNameInput;
