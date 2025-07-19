
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

interface CharacterNameInputProps {
  name: string;
  onNameChange: (name: string) => void;
}

const CharacterNameInput: React.FC<CharacterNameInputProps> = ({ 
  name, 
  onNameChange 
}) => {
  const MAX_LENGTH = 30;
  const isOverLimit = name.length > MAX_LENGTH;
  const remainingChars = MAX_LENGTH - name.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Don't allow input beyond the limit
    if (value.length <= MAX_LENGTH) {
      onNameChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="characterName" className="text-lg">Name</Label>
      <div className="space-y-2">
        <Input
          id="characterName"
          value={name}
          onChange={handleChange}
          placeholder="Enter character name (e.g., Adam, Princess Luna, Seleem)"
          className={`p-6 text-lg ${isOverLimit ? 'border-red-500 focus:border-red-500' : ''}`}
          maxLength={MAX_LENGTH}
        />
        
        <div className="flex justify-between items-center text-sm">
          <div className={`transition-colors ${remainingChars < 5 ? 'text-orange-600' : 'text-gray-500'}`}>
            {remainingChars} characters remaining
          </div>
          {isOverLimit && (
            <div className="flex items-center gap-1 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Name too long</span>
            </div>
          )}
        </div>

        {isOverLimit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Name is too long</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              Please keep the character name under {MAX_LENGTH} characters. Use the appearance field for detailed descriptions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterNameInput;
