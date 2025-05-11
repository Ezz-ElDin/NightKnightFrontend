
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Character } from "./constants";
import CharacterDialog from "./character/CharacterDialog";

interface CharacterManagerProps {
  characters: Character[];
  updateCharacters: (characters: Character[]) => void;
}

const CharacterManager: React.FC<CharacterManagerProps> = ({ characters, updateCharacters }) => {
  const [characterDialogOpen, setCharacterDialogOpen] = useState(false);

  const addCharacter = (characterData: Omit<Character, "id">) => {
    const newCharacter = {
      ...characterData,
      id: Date.now().toString(),
    };
    
    updateCharacters([...characters, newCharacter]);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Characters</Label>
        <Button 
          variant="outline" 
          onClick={() => setCharacterDialogOpen(true)}
          className="border-primary text-primary hover:text-primary hover:bg-primary/10"
        >
          + Add Character
        </Button>
      </div>
      
      <CharacterDialog 
        open={characterDialogOpen}
        onOpenChange={setCharacterDialogOpen}
        onAddCharacter={addCharacter}
      />
    </div>
  );
};

export default CharacterManager;
