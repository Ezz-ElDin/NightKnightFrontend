
import React from "react";
import { Label } from "@/components/ui/label";
import CharacterNameInput from "../CharacterNameInput";

interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onNext: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ name, onNameChange, onNext }) => {
  const MAX_LENGTH = 30;
  const isValidName = name.trim().length > 0 && name.length <= MAX_LENGTH;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValidName) {
      onNext();
    }
  };

  const handleNext = () => {
    if (isValidName) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What's your character's name?</Label>
        <p className="text-gray-600">Give your character a magical name that fits their personality!</p>
        
        <CharacterNameInput
          name={name}
          onNameChange={onNameChange}
        />
        
        {name.trim().length > 0 && name.length > MAX_LENGTH && (
          <p className="text-sm text-red-600">
            ⚠️ Please shorten the name to continue to the next step
          </p>
        )}
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
          <div className="flex items-start space-x-3">
            <div className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0">💡</div>
            <div>
              <h4 className="text-yellow-900 font-semibold mb-2">Language Tip</h4>
              <p className="text-yellow-800 text-sm leading-relaxed">
                Write the character's name in the same language you chose in the previous step to guarantee better results. For example, if you selected Arabic, use names like "أحمد" or "فاطمة" instead of "Ahmed" or "Fatima".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameStep;
