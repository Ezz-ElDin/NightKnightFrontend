
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PERSONALITY_TRAITS = [
  { value: "brave", label: "Brave", emoji: "🦁" },
  { value: "kind", label: "Kind", emoji: "💖" },
  { value: "funny", label: "Funny", emoji: "😄" },
  { value: "smart", label: "Smart", emoji: "🧠" },
  { value: "curious", label: "Curious", emoji: "🔍" },
  { value: "adventurous", label: "Adventurous", emoji: "🗺️" },
  { value: "creative", label: "Creative", emoji: "🎨" },
  { value: "loyal", label: "Loyal", emoji: "🤝" },
  { value: "cheerful", label: "Cheerful", emoji: "🌟" },
  { value: "determined", label: "Determined", emoji: "💪" },
  { value: "gentle", label: "Gentle", emoji: "🌸" },
  { value: "wise", label: "Wise", emoji: "🦉" },
];

interface PersonalitySelectorProps {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({
  selectedTraits,
  onTraitToggle,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Select up to 3 personality traits that describe your character:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {PERSONALITY_TRAITS.map((trait) => {
          const isSelected = selectedTraits.includes(trait.value);
          
          return (
            <Button
              key={trait.value}
              variant="outline"
              onClick={() => onTraitToggle(trait.value)}
              className={`relative h-16 p-3 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 border-2 ${
                isSelected 
                  ? "border-purple-500 bg-purple-50 text-purple-700" 
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-purple-500 rounded-sm flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <span className="text-2xl">{trait.emoji}</span>
              <span className="text-xs text-center">{trait.label}</span>
            </Button>
          );
        })}
      </div>
      
      <div className="text-sm text-gray-500 text-center">
        {selectedTraits.length}/3 traits selected
      </div>
    </div>
  );
};

export default PersonalitySelector;
