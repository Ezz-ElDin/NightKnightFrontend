
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppearanceEyesStepProps {
  selectedEyes: string;
  customEyes: string;
  onEyesChange: (eyes: string) => void;
  onCustomEyesChange: (eyes: string) => void;
  onNext: () => void;
  characterName: string;
}

const EYES_OPTIONS = [
  { value: "brown eyes", label: "Brown", color: "bg-amber-800" },
  { value: "blue eyes", label: "Blue", color: "bg-blue-500" },
  { value: "green eyes", label: "Green", color: "bg-green-500" },
  { value: "hazel eyes", label: "Hazel", color: "bg-yellow-600" },
  { value: "gray eyes", label: "Gray", color: "bg-gray-500" },
  { value: "black eyes", label: "Black", color: "bg-black" },
  { value: "violet eyes", label: "Violet", color: "bg-purple-500" },
  { value: "golden eyes", label: "Golden", color: "bg-yellow-400" },
  { value: "silver eyes", label: "Silver", color: "bg-gray-300" },
  { value: "red eyes", label: "Red", color: "bg-red-500" },
  { value: "rainbow eyes", label: "Rainbow", color: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" },
  { value: "other", label: "Other", color: "bg-gray-100 border-2 border-dashed border-gray-400" },
];

const AppearanceEyesStep: React.FC<AppearanceEyesStepProps> = ({ 
  selectedEyes, 
  customEyes, 
  onEyesChange, 
  onCustomEyesChange, 
  onNext,
  characterName
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedEyes) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown}>
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">What eye colour does {characterName} have?</Label>
        <p className="text-gray-600">Choose the eye colour that fits {characterName} best!</p>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {EYES_OPTIONS.map(eyes => (
            <Button
              key={eyes.value}
              variant={selectedEyes === eyes.value ? "default" : "outline"}
              onClick={() => onEyesChange(eyes.value)}
              className={`h-16 p-2 flex flex-col items-center justify-center space-y-1 text-sm font-medium transition-all duration-200 ${
                selectedEyes === eyes.value 
                  ? "ring-2 ring-purple-500 ring-offset-2 scale-105" 
                  : "hover:scale-105 hover:shadow-md"
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${eyes.color}`}></div>
              <span>{eyes.label}</span>
            </Button>
          ))}
        </div>

        {selectedEyes === "other" && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="customEyes" className="text-lg">Custom Eye Colour</Label>
            <Input
              id="customEyes"
              value={customEyes}
              onChange={(e) => onCustomEyesChange(e.target.value)}
              placeholder="Describe your custom eye colour..."
              className="p-4 text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceEyesStep;
