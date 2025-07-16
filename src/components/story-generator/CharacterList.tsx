import React, { useState } from "react";
import { Edit } from "lucide-react";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";

// Role options with emojis - girl empowerment focused
const ROLE_EMOJIS = {
  "Hero": "🦸‍♀️",
  "Villain": "😈",
  "Mentor": "👩‍🏫", 
  "Friend": "👯‍♀️",
  "Sidekick": "👩‍🔬",
  "Guide": "👩‍✈️"
};

interface Character {
  id: string;
  name: string;
  appearance: string;
  personality: string[];
  role: string;
}

interface CharacterListProps {
  characters: Character[];
  onRemoveCharacter: (id: string) => void;
  onEditCharacter?: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onRemoveCharacter, onEditCharacter }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<{ id: string; name: string } | null>(null);

  // Helper function to get a gradient color based on character role
  const getCharacterGradient = (role: string) => {
    switch(role) {
      case "Hero": return "from-purple-200 to-purple-400 text-purple-800";
      case "Villain": return "from-red-200 to-red-400 text-red-800";
      case "Sidekick": return "from-green-200 to-green-400 text-green-800";
      case "Mentor": return "from-blue-200 to-blue-400 text-blue-800";
      case "Friend": return "from-pink-200 to-pink-400 text-pink-800";
      case "Guide": return "from-yellow-200 to-yellow-400 text-yellow-800";
      default: return "from-gray-200 to-gray-400 text-gray-800";
    }
  };

  const handleDeleteClick = (character: Character) => {
    setCharacterToDelete({ id: character.id, name: character.name });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (characterToDelete) {
      onRemoveCharacter(characterToDelete.id);
      setCharacterToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setCharacterToDelete(null);
    setDeleteDialogOpen(false);
  };

  if (characters.length === 0) {
    return (
      <div className="text-center p-8 mb-6 border-2 border-dashed border-primary/20 rounded-xl">
        <div className="text-4xl mb-2">🧙‍♀️👸🦁</div>
        <div className="text-lg text-muted-foreground">No characters yet!</div>
        <div>Add some magical friends to your story.</div>
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-4">
        {characters.map((character) => (
          <div 
            key={character.id} 
            className="border-2 border-primary/20 p-4 rounded-xl bg-white shadow-md flex flex-col md:flex-row items-center gap-4 relative"
          >
            {/* Character emoji icon */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${getCharacterGradient(character.role)}`}>
              <span className="text-4xl">{ROLE_EMOJIS[character.role] || "👤"}</span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="font-bold text-xl">{character.name}</div>
              <div className="text-sm text-primary bg-primary/10 inline-block px-2 py-1 rounded-full">
                <span className="mr-1 text-xl">{ROLE_EMOJIS[character.role] || "👤"}</span>
                {character.role}
              </div>
              
              <div className="mt-2 text-gray-600">{character.appearance}</div>
              
              <div className="mt-2 flex flex-wrap gap-1 justify-center md:justify-start">
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
            
            {/* Remove button */}
            <button
              onClick={() => handleDeleteClick(character)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive h-6 w-6 flex items-center justify-center rounded-full hover:bg-destructive/10"
              aria-label="Remove character"
            >
              ✕
            </button>
            
            {/* Edit button - Simple like the X button */}
            {onEditCharacter && (
              <button
                onClick={() => onEditCharacter(character)}
                className="absolute top-2 right-10 text-muted-foreground hover:text-primary h-6 w-6 flex items-center justify-center rounded-full hover:bg-primary/10"
                aria-label="Edit character"
                title="Edit"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete this character?"
        description={`Are you sure you want to delete ${characterToDelete?.name}? This action cannot be undone.`}
      />
    </>
  );
};

export default CharacterList;
