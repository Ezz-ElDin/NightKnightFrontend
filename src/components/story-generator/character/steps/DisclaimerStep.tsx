
import React from "react";
import CharacterDisclaimer from "../CharacterDisclaimer";

interface DisclaimerStepProps {
  onNext: () => void;
}

const DisclaimerStep: React.FC<DisclaimerStepProps> = ({ onNext }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <CharacterDisclaimer />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Welcome to Character Creation! ✨</h2>
        <p className="text-gray-600">
          Let's create an amazing character for your story! We'll guide you through each step to make sure your character is perfectly crafted.
        </p>
        <p className="text-sm text-gray-500">
          Press Enter or click Next to begin creating your character.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerStep;
