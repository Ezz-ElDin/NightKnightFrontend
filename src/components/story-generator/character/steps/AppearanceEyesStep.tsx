
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EYE_OPTIONS = [
  { value: "brown", label: "Brown" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "hazel", label: "Hazel" },
  { value: "grey", label: "Grey" },
  { value: "amber", label: "Amber" },
  { value: "violet", label: "Violet" },
  { value: "black", label: "Black" },
  { value: "other", label: "Other" },
];

interface AppearanceEyesStepProps {
  selectedEyes: string;
  customEyes: string;
  onEyesChange: (eyes: string) => void;
  onCustomEyesChange: (eyes: string) => void;
  onNext: () => void;
}

const AppearanceEyesStep: React.FC<AppearanceEyesStepProps> = ({
  selectedEyes,
  customEyes,
  onEyesChange,
  onCustomEyesChange,
  onNext,
}) => {
  const handleEyesSelect = (eyes: string) => {
    onEyesChange(eyes);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          What colour are your character's eyes?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the eye colour that matches your character
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {EYE_OPTIONS.map((eye) => (
          <Button
            key={eye.value}
            variant={selectedEyes === eye.value ? "default" : "outline"}
            className="h-16 text-lg font-medium"
            onClick={() => handleEyesSelect(eye.value)}
          >
            {eye.label}
          </Button>
        ))}
      </div>

      {selectedEyes === "other" && (
        <div className="space-y-2">
          <Label htmlFor="custom-eyes">Custom eye colour</Label>
          <Input
            id="custom-eyes"
            type="text"
            placeholder="Enter custom colour..."
            value={customEyes}
            onChange={(e) => onCustomEyesChange(e.target.value)}
            className="text-lg"
          />
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button
          onClick={onNext}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AppearanceEyesStep;
