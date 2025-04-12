
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Character, PERSONALITY_TRAITS, CHARACTER_ROLES } from "./constants";

interface CharacterManagerProps {
  characters: Character[];
  updateCharacters: (characters: Character[]) => void;
}

const CharacterManager: React.FC<CharacterManagerProps> = ({ characters, updateCharacters }) => {
  const [characterDialogOpen, setCharacterDialogOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>({
    id: "",
    name: "",
    appearance: "",
    personality: [],
    role: "Hero"
  });

  const addCharacter = () => {
    if (!currentCharacter.name) return;
    
    const newCharacter = {
      ...currentCharacter,
      id: Date.now().toString(),
    };
    
    updateCharacters([...characters, newCharacter]);
    
    setCurrentCharacter({
      id: "",
      name: "",
      appearance: "",
      personality: [],
      role: "Hero"
    });
    
    setCharacterDialogOpen(false);
  };

  const removeCharacter = (id: string) => {
    updateCharacters(characters.filter(char => char.id !== id));
  };

  const togglePersonalityTrait = (trait: string) => {
    setCurrentCharacter(prev => {
      const traits = prev.personality.includes(trait)
        ? prev.personality.filter(t => t !== trait)
        : [...prev.personality, trait];
      
      return { ...prev, personality: traits };
    });
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
      
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {characters.map((character) => (
            <div key={character.id} className="border-2 border-border rounded-xl p-3 relative">
              <button
                onClick={() => removeCharacter(character.id)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
              >
                ✕
              </button>
              <h3 className="font-bold">{character.name}</h3>
              <p className="text-sm text-muted-foreground">{character.role}</p>
              <p className="text-sm mt-1">{character.appearance}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {character.personality.map(trait => (
                  <span 
                    key={trait} 
                    className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 border-2 border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">No characters yet. Add some magic!</p>
        </div>
      )}
      
      <Dialog open={characterDialogOpen} onOpenChange={setCharacterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a Character</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="characterName">Name</Label>
              <Input
                id="characterName"
                value={currentCharacter.name}
                onChange={(e) => setCurrentCharacter({...currentCharacter, name: e.target.value})}
                placeholder="What's this character called?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appearance">Appearance</Label>
              <Textarea
                id="appearance"
                value={currentCharacter.appearance}
                onChange={(e) => setCurrentCharacter({...currentCharacter, appearance: e.target.value})}
                placeholder="What does this character look like?"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Personality Traits</Label>
              <div className="grid grid-cols-2 gap-2">
                {PERSONALITY_TRAITS.map(trait => (
                  <div key={trait} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`trait-${trait}`}
                      checked={currentCharacter.personality.includes(trait)}
                      onCheckedChange={() => togglePersonalityTrait(trait)} 
                    />
                    <label 
                      htmlFor={`trait-${trait}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {trait}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role in Story</Label>
              <Select
                value={currentCharacter.role}
                onValueChange={(value) => setCurrentCharacter({...currentCharacter, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {CHARACTER_ROLES.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={addCharacter}>Add Character</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterManager;
