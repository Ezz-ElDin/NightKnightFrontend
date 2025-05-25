
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
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  const addCharacter = (characterData: Omit<Character, "id">) => {
    const newCharacter = {
      ...characterData,
      id: Date.now().toString(),
    };
    updateCharacters([...characters, newCharacter]);
  };

  // When editing, replace the character by id
  const editCharacter = (characterData: Omit<Character, "id">) => {
    if (!editingCharacter) return;
    const updated = {
      ...editingCharacter,
      ...characterData
    };
    updateCharacters(
      characters.map(c => c.id === editingCharacter.id ? updated : c)
    );
    setEditingCharacter(null);
  };

  // Handler to start editing
  const startEditCharacter = (character: Character) => {
    setEditingCharacter(character);
    setCharacterDialogOpen(true);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Characters</Label>
        <Button 
          variant="outline" 
          onClick={() => { setEditingCharacter(null); setCharacterDialogOpen(true); }}
          className="border-primary text-primary hover:text-primary hover:bg-primary/10"
        >
          + Add Character
        </Button>
      </div>
      <CharacterDialog 
        open={characterDialogOpen}
        onOpenChange={(open) => {
          setCharacterDialogOpen(open);
          if (!open) setEditingCharacter(null);
        }}
        onAddCharacter={editingCharacter ? editCharacter : addCharacter}
        initialCharacter={editingCharacter || undefined}
      />
    </div>
  );
};

export default CharacterManager;
