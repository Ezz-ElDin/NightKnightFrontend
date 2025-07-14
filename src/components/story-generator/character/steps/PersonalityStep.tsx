
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { PERSONALITY_TRAITS } from "../../constants";

interface PersonalityStepProps {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ 
  selectedTraits, 
  onTraitToggle 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What's their personality like?
        </h2>
        <p className="text-muted-foreground">
          Select traits that describe your character (optional)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-primary/5 p-6 rounded-xl border border-primary/20">
        {PERSONALITY_TRAITS.map(trait => (
          <div key={trait} className="flex items-center space-x-3">
            <Checkbox 
              id={`trait-${trait}`}
              checked={selectedTraits.includes(trait)}
              onCheckedChange={() => onTraitToggle(trait)}
              className="w-5 h-5" 
            />
            <Label 
              htmlFor={`trait-${trait}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {trait}
            </Label>
          </div>
        ))}
      </div>

      {selectedTraits.length > 0 && (
        <div className="text-center text-sm text-green-600">
          ✨ Great! These traits will help shape your character's story.
        </div>
      )}
    </div>
  );
};

export default PersonalityStep;
