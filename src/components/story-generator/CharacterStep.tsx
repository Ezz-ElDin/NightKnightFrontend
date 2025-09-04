
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
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0">ℹ️</div>
                <div>
                  <h4 className="text-blue-900 font-semibold mb-2">🌟 Tip for a More Magical Story</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    The more you share about your character how they look, the better our magic works! Your details help NightKnight keep your little hero consistent across every scene.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-lg mb-4">
              Every great story needs characters! Who will be in your story?
            </div>
            <CharacterList 
              characters={storyData.characters}
              onRemoveCharacter={removeCharacter}
              onEditCharacter={(character) => {
                // This will be handled by CharacterManager
                const characterManagerRef = document.querySelector('[data-character-manager]');
                if (characterManagerRef) {
                  characterManagerRef.dispatchEvent(new CustomEvent('editCharacter', { detail: character }));
                }
              }}
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

export default React.memo(CharacterStep);
