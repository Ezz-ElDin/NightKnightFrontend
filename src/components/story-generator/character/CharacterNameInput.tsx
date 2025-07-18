
import React, { useRef, useEffect } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Explicitly blur the input to prevent any autofocus behavior
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="characterName" className="text-lg">Name</Label>
      <Input
        ref={inputRef}
        id="characterName"
        value={name}
        onChange={handleChange}
        placeholder="What's this character called?"
        className="p-6 text-lg"
        autoFocus={false}
        tabIndex={0}
      />
    </div>
  );
};

export default CharacterNameInput;
