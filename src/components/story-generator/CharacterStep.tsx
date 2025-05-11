
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
            />
          </div>
          
          <CharacterManager 
            characters={storyData.characters} 
            updateCharacters={(characters) => updateStoryData({ characters })} 
          />
        </div>
      </div>
    </StorySettingStep>
  );
};

export default CharacterStep;
