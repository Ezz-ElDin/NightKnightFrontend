
import React from "react";
import { Label } from "@/components/ui/label";
import { AppearanceForm } from "../AppearanceForm";

interface AppearanceStepProps {
  appearanceAge: string;
  onAppearanceAgeChange: (v: string) => void;
  appearanceColor: string;
  onAppearanceColorChange: (v: string) => void;
  appearanceColorCustom: string;
  onAppearanceColorCustomChange: (v: string) => void;
  appearanceType: string;
  onAppearanceTypeChange: (v: string) => void;
  appearanceTypeCustom: string;
  onAppearanceTypeCustomChange: (v: string) => void;
  appearanceAccessory1: string;
  onAppearanceAccessory1Change: (v: string) => void;
  appearanceAccessory2: string;
  onAppearanceAccessory2Change: (v: string) => void;
  generatedAppearance: string;
}

const AppearanceStep: React.FC<AppearanceStepProps> = (props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-2xl font-semibold">How does your character look?</Label>
        <p className="text-gray-600">Describe your character's appearance in detail!</p>
        
        <AppearanceForm {...props} />
      </div>
    </div>
  );
};

export default AppearanceStep;
