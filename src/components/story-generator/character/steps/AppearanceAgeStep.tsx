
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

interface AppearanceAgeStepProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
  onNext: () => void;
  characterName: string;
}

const AGE_OPTIONS = [
  { value: "baby", label: "Baby", emoji: "👶" },
  { value: "child", label: "Child", emoji: "👧" },
  { value: "teen", label: "Teen", emoji: "👦" },
  { value: "adult", label: "Adult", emoji: "👨" },
  { value: "elderly", label: "Elderly", emoji: "👴" },
];

const AppearanceAgeStep: React.FC<AppearanceAgeStepProps> = ({ selectedAge, onAgeChange, onNext, characterName }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedAge) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">How old is {characterName}?</Label>
        <p className="text-gray-600">Choose the age range that fits {characterName} best!</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {AGE_OPTIONS.map(age => (
            <Button
              key={age.value}
              variant={selectedAge === age.value ? "default" : "outline"}
              onClick={() => onAgeChange(age.value)}
              className={`h-20 p-4 flex flex-col items-center justify-center space-y-2 text-lg font-medium transition-all duration-200 ${
                selectedAge === age.value 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                  : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
              }`}
            >
              <span className="text-3xl">{age.emoji}</span>
              <span className="text-sm">{age.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceAgeStep;
