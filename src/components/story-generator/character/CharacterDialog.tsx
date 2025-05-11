
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Character } from "../constants";
import { AppearanceForm } from "./AppearanceForm";
import { RoleSelector } from "./RoleSelector";
import CharacterNameInput from "./CharacterNameInput";
import PersonalitySelector from "./PersonalitySelector";

interface CharacterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCharacter: (character: Omit<Character, "id">) => void;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddCharacter
}) => {
  const [character, setCharacter] = useState<Omit<Character, "id">>({
    name: "",
    appearance: "",
    personality: [],
    role: "Hero"
  });

  const handleAddCharacter = () => {
    if (!character.name) return;
    onAddCharacter(character);
    resetCharacter();
    onOpenChange(false);
  };

  const resetCharacter = () => {
    setCharacter({
      name: "",
      appearance: "",
      personality: [],
      role: "Hero"
    });
  };

  const togglePersonalityTrait = (trait: string) => {
    setCharacter(prev => {
      const traits = prev.personality.includes(trait)
        ? prev.personality.filter(t => t !== trait)
        : [...prev.personality, trait];
      
      return { ...prev, personality: traits };
    });
  };

  return (
    <Dialog open={open} onOpenChange={(newOpenState) => {
      if (!newOpenState) resetCharacter();
      onOpenChange(newOpenState);
    }}>
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-primary/5 border-2 border-primary/30 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Create a Magical Character
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
          {/* Role selection at the top */}
          <RoleSelector 
            selectedRole={character.role} 
            onRoleChange={(role) => setCharacter({...character, role})} 
          />
          
          <CharacterNameInput
            name={character.name}
            onNameChange={(name) => setCharacter({...character, name})}
          />
          
          <AppearanceForm
            onAppearanceChange={(appearance) => setCharacter({...character, appearance})}
          />
          
          <PersonalitySelector
            selectedTraits={character.personality}
            onTraitToggle={togglePersonalityTrait}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleAddCharacter}
            className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
          >
            Add Character ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDialog;
