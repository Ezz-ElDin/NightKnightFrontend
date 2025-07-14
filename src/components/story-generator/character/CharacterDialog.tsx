
import React, { useState, useEffect } from "react";
import { 
  FullScreenDialog, 
  FullScreenDialogContent, 
  FullScreenDialogHeader, 
  FullScreenDialogTitle
} from "@/components/ui/full-screen-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Character } from "../constants";
import { useCharacterSteps } from "@/hooks/useCharacterSteps";
import CharacterPreview from "./CharacterPreview";
import CharacterStepNavigation from "./CharacterStepNavigation";
import NameStep from "./steps/NameStep";
import RoleStep from "./steps/RoleStep";
import AppearanceAgeStep from "./steps/AppearanceAgeStep";
import AppearanceColorStep from "./steps/AppearanceColorStep";
import AppearanceTypeStep from "./steps/AppearanceTypeStep";
import AppearanceAccessoriesStep from "./steps/AppearanceAccessoriesStep";
import PersonalityStep from "./steps/PersonalityStep";

// Helper to synthesize appearance preview summary for display & saving
function summarizeAppearance({
  appearanceAge,
  appearanceColor,
  appearanceColorCustom,
  appearanceType,
  appearanceTypeCustom,
  appearanceAccessory1,
  appearanceAccessory2,
}: {
  appearanceAge: string;
  appearanceColor: string;
  appearanceColorCustom: string;
  appearanceType: string;
  appearanceTypeCustom: string;
  appearanceAccessory1: string;
  appearanceAccessory2: string;
}) {
  // Choose custom or regular values
  const color = appearanceColor === "other" ? appearanceColorCustom : appearanceColor;
  const type = appearanceType === "other" ? appearanceTypeCustom : appearanceType;

  // Compose the "A" or "An" logic (simple: check for vowel)
  const firstWord = [appearanceAge, color, type].find((v) => v && v.trim());
  const article = firstWord && /^[aeiou]/i.test(firstWord) ? "An" : "A";

  // Compose main phrase
  let phrase = `${article}`;
  if (appearanceAge) phrase += ` ${appearanceAge}`;
  if (color) phrase += ` ${color}`;
  if (type) phrase += ` ${type}`;
  
  // Compose accessories
  const accessories = [appearanceAccessory1, appearanceAccessory2].filter(x => !!x && x.trim());
  if (accessories.length === 1) {
    phrase += `, with ${accessories[0]}`;
  } else if (accessories.length === 2) {
    phrase += `, with ${accessories[0]} and ${accessories[1]}`;
  }

  phrase += ".";

  // If nothing filled in, avoid "A  ." (return empty).
  if (
    !appearanceAge && !color && !type && accessories.length === 0
  ) return "";

  return phrase;
}

interface AppearanceFields {
  appearanceAge: string;
  appearanceColor: string;
  appearanceColorCustom: string;
  appearanceType: string;
  appearanceTypeCustom: string;
  appearanceAccessory1: string;
  appearanceAccessory2: string;
}

interface CharacterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCharacter: (character: Omit<Character, "id">) => void;
  initialCharacter?: Omit<Character, "id">;
}

const initialAppearanceFields: AppearanceFields = {
  appearanceAge: "",
  appearanceColor: "",
  appearanceColorCustom: "",
  appearanceType: "",
  appearanceTypeCustom: "",
  appearanceAccessory1: "",
  appearanceAccessory2: "",
};

const CharacterDialog: React.FC<CharacterDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddCharacter,
  initialCharacter
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Hero");
  const [personality, setPersonality] = useState<string[]>([]);
  const [appearanceFields, setAppearanceFields] = useState<AppearanceFields>(initialAppearanceFields);
  const [hasInitialized, setHasInitialized] = useState(false);

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    resetSteps,
  } = useCharacterSteps();

  // Initialize form data only when dialog opens
  useEffect(() => {
    if (open && !hasInitialized) {
      if (initialCharacter) {
        setName(initialCharacter.name || "");
        setRole(initialCharacter.role || "Hero");
        setPersonality(initialCharacter.personality || []);
        setAppearanceFields(initialAppearanceFields);
      } else {
        setName("");
        setRole("Hero");
        setPersonality([]);
        setAppearanceFields(initialAppearanceFields);
      }
      resetSteps();
      setHasInitialized(true);
    } else if (!open) {
      setHasInitialized(false);
    }
  }, [open, initialCharacter, resetSteps, hasInitialized]);

  const handleAppearanceField = (field: keyof AppearanceFields, value: string) => {
    setAppearanceFields((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "appearanceColor" && value !== "other" ? { appearanceColorCustom: "" } : {}),
      ...(field === "appearanceType" && value !== "other" ? { appearanceTypeCustom: "" } : {}),
    }));
  };

  const togglePersonalityTrait = (trait: string) => {
    setPersonality((prev) =>
      prev.includes(trait)
        ? prev.filter((t) => t !== trait)
        : [...prev, trait]
    );
  };

  const resetCharacter = () => {
    setName("");
    setRole("Hero");
    setPersonality([]);
    setAppearanceFields(initialAppearanceFields);
    setHasInitialized(false);
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case "name":
        return name.trim().length > 0;
      case "role":
        return role.length > 0;
      case "appearance-age":
        return appearanceFields.appearanceAge.length > 0;
      case "appearance-color":
        return appearanceFields.appearanceColor.length > 0 && 
               (appearanceFields.appearanceColor !== "other" || appearanceFields.appearanceColorCustom.trim().length > 0);
      case "appearance-type":
        return appearanceFields.appearanceType.length > 0 && 
               (appearanceFields.appearanceType !== "other" || appearanceFields.appearanceTypeCustom.trim().length > 0);
      case "appearance-accessories":
        return true; // Optional step
      case "personality":
        return true; // Optional step
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleAddCharacter();
    } else {
      goToNextStep();
    }
  };

  const handleSkip = () => {
    if (isLastStep) {
      handleAddCharacter();
    } else {
      goToNextStep();
    }
  };

  const handleAddCharacter = () => {
    if (!name.trim()) return;
    
    const appearance = summarizeAppearance({ ...appearanceFields });
    onAddCharacter({
      name,
      appearance,
      personality,
      role,
    });
    resetCharacter();
    onOpenChange(false);
  };

  const generatedAppearance = summarizeAppearance({ ...appearanceFields });

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "name":
        return (
          <NameStep
            name={name}
            onNameChange={setName}
            onNext={handleNext}
          />
        );
      case "role":
        return (
          <RoleStep
            selectedRole={role}
            onRoleChange={setRole}
            onNext={handleNext}
          />
        );
      case "appearance-age":
        return (
          <AppearanceAgeStep
            selectedAge={appearanceFields.appearanceAge}
            onAgeChange={(v: string) => handleAppearanceField("appearanceAge", v)}
            onNext={handleNext}
          />
        );
      case "appearance-color":
        return (
          <AppearanceColorStep
            selectedColor={appearanceFields.appearanceColor}
            customColor={appearanceFields.appearanceColorCustom}
            onColorChange={(v: string) => handleAppearanceField("appearanceColor", v)}
            onCustomColorChange={(v: string) => handleAppearanceField("appearanceColorCustom", v)}
            onNext={handleNext}
          />
        );
      case "appearance-type":
        return (
          <AppearanceTypeStep
            selectedType={appearanceFields.appearanceType}
            customType={appearanceFields.appearanceTypeCustom}
            onTypeChange={(v: string) => handleAppearanceField("appearanceType", v)}
            onCustomTypeChange={(v: string) => handleAppearanceField("appearanceTypeCustom", v)}
            onNext={handleNext}
          />
        );
      case "appearance-accessories":
        return (
          <AppearanceAccessoriesStep
            accessory1={appearanceFields.appearanceAccessory1}
            accessory2={appearanceFields.appearanceAccessory2}
            onAccessory1Change={(v: string) => handleAppearanceField("appearanceAccessory1", v)}
            onAccessory2Change={(v: string) => handleAppearanceField("appearanceAccessory2", v)}
            onNext={handleNext}
          />
        );
      case "personality":
        return (
          <PersonalityStep
            selectedTraits={personality}
            onTraitToggle={togglePersonalityTrait}
            onNext={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FullScreenDialog open={open} onOpenChange={(newOpenState) => {
      if (!newOpenState) resetCharacter();
      onOpenChange(newOpenState);
    }}>
      <FullScreenDialogContent className="bg-gradient-to-b from-white to-primary/5 flex flex-col overflow-hidden">
        {/* Header */}
        <FullScreenDialogHeader className="flex-shrink-0 px-8 py-6 border-b border-primary/20">
          <FullScreenDialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {initialCharacter ? "Edit Magical Character" : "Create a Magical Character"}
          </FullScreenDialogTitle>
        </FullScreenDialogHeader>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 px-8 py-6">
              <div className="max-w-4xl mx-auto">
                {renderCurrentStep()}
              </div>
            </ScrollArea>

            {/* Navigation */}
            <div className="flex-shrink-0 px-8 py-6 border-t border-primary/20 bg-white">
              <div className="max-w-4xl mx-auto">
                <CharacterStepNavigation
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                  onBack={goToPreviousStep}
                  onNext={handleNext}
                  onSkip={handleSkip}
                  canProceed={isCurrentStepValid()}
                />
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="w-80 border-l border-primary/20 bg-primary/5 p-6">
            <CharacterPreview
              name={name}
              role={role}
              generatedAppearance={generatedAppearance}
              personality={personality}
            />
          </div>
        </div>
      </FullScreenDialogContent>
    </FullScreenDialog>
  );
};

export default CharacterDialog;
