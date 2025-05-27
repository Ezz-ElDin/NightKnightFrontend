import React from "react";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { Users } from "lucide-react";
import CharacterManager from "@/components/story-generator/CharacterManager";
import CharacterList from "@/components/story-generator/CharacterList";

interface CharacterStepProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const CharacterStep: React.FC<CharacterStepProps> = ({ storyData, updateStoryData }) => {
  const removeCharacter = (id: string) => {
    const updatedCharacters = storyData.characters.filter(c => c.id !== id);
    updateStoryData({ characters: updatedCharacters });
  };

  // Handler to edit character: this updates via CharacterManager, so just rerender here.
  const [editChar, setEditChar] = React.useState<any>(null);

  return (
    <StorySettingStep 
      title="Who's in Your Story?"
      description="Add characters to your adventure!"
      icon={<Users className="h-8 w-8 text-blue-400" />}
    >
      <div className="mt-4">
        <div className="characters-container">
          <div className="mb-4">
            <div className="text-lg mb-4">
              Every great story needs characters! Who will be in your story?
            </div>
            <CharacterList 
              characters={storyData.characters}
              onRemoveCharacter={removeCharacter}
              onEditCharacter={
                // Forward to manager below, which opens the dialog for edit
                (character) => {
                  if (editChar && character.id === editChar.id) return; // already editing
                  setEditChar(character);
                }
              }
            />
          </div>
          <CharacterManager 
            characters={storyData.characters} 
            updateCharacters={(characters) => updateStoryData({ characters })} 
            // Give initialCharacter via prop drilling, via useState here
            key={editChar ? editChar.id : undefined}
            // We'll use prop injection on CharacterDialog below, but keep standard use for now.
          />
        </div>
      </div>
    </StorySettingStep>
  );
};

export default React.memo(CharacterStep);
