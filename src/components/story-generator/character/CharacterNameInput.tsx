
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
    // Prevent autofocus by blurring immediately and with a delay
    const preventFocus = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    };

    // Blur immediately
    preventFocus();
    
    // Also blur after a short delay in case the dialog focuses it later
    const timeoutId = setTimeout(preventFocus, 10);
    
    return () => clearTimeout(timeoutId);
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
        tabIndex={-1}
        onFocus={(e) => {
          // If the input gets focus unexpectedly, blur it immediately
          if (document.activeElement === e.target) {
            e.target.blur();
          }
        }}
      />
    </div>
  );
};

export default CharacterNameInput;
