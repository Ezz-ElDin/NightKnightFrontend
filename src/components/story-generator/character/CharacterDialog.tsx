
import React, { useState, useEffect } from "react";
import { 
  FullScreenDialog, 
  FullScreenDialogContent, 
  FullScreenDialogHeader, 
  FullScreenDialogTitle
} from "@/components/ui/full-screen-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Character } from "../constants";
import { useCharacterSteps, CharacterStep } from "@/hooks/useCharacterSteps";
import CharacterStepNavigation from "./CharacterStepNavigation";
import CharacterPreview from "./CharacterPreview";

// Step components
import DisclaimerStep from "./steps/DisclaimerStep";
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

interface CharacterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCharacter: (character: Omit<Character, "id">) => void;
  initialCharacter?: Omit<Character, "id">;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddCharacter,
  initialCharacter
}) => {
  // Step management
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPrevStep,
    resetSteps
  } = useCharacterSteps();

  // Character data
  const [name, setName] = useState("");
  const [role, setRole] = useState("Hero");
  const [personality, setPersonality] = useState<string[]>([]);
  const [appearanceAge, setAppearanceAge] = useState("");
  const [appearanceColor, setAppearanceColor] = useState("");
  const [appearanceColorCustom, setAppearanceColorCustom] = useState("");
  const [appearanceType, setAppearanceType] = useState("");
  const [appearanceTypeCustom, setAppearanceTypeCustom] = useState("");
  const [appearanceAccessory1, setAppearanceAccessory1] = useState("");
  const [appearanceAccessory2, setAppearanceAccessory2] = useState("");

  // Reset or hydrate fields on open
  useEffect(() => {
    if (open) {
      if (initialCharacter) {
        setName(initialCharacter.name || "");
        setRole(initialCharacter.role || "Hero");
        setPersonality(initialCharacter.personality || []);
      } else {
        setName("");
        setRole("Hero");
        setPersonality([]);
        setAppearanceAge("");
        setAppearanceColor("");
        setAppearanceColorCustom("");
        setAppearanceType("");
        setAppearanceTypeCustom("");
        setAppearanceAccessory1("");
        setAppearanceAccessory2("");
      }
      resetSteps();
    }
  }, [open, initialCharacter, resetSteps]);

  const togglePersonalityTrait = (trait: string) => {
    setPersonality((prev) =>
      prev.includes(trait)
        ? prev.filter((t) => t !== trait)
        : [...prev, trait]
    );
  };

  const handleClose = () => {
    resetSteps();
    onOpenChange(false);
  };

  const handleFinish = () => {
    if (!name.trim()) return;
    
    const appearance = summarizeAppearance({
      appearanceAge,
      appearanceColor,
      appearanceColorCustom,
      appearanceType,
      appearanceTypeCustom,
      appearanceAccessory1,
      appearanceAccessory2,
    });

    onAddCharacter({
      name: name.trim(),
      appearance,
      personality,
      role,
    });
    
    handleClose();
  };

  const canGoNext = () => {
    switch (currentStep) {
      case "disclaimer":
        return true;
      case "name":
        return name.trim().length > 0;
      case "role":
        return role !== "";
      case "appearance-age":
        return appearanceAge !== "";
      case "appearance-color":
        return appearanceColor !== "" && (appearanceColor !== "other" || appearanceColorCustom.trim() !== "");
      case "appearance-type":
        return appearanceType !== "" && (appearanceType !== "other" || appearanceTypeCustom.trim() !== "");
      case "appearance-accessories":
        return true; // Optional step
      case "personality":
        return true; // Optional step
      default:
        return false;
    }
  };

  const canSkip = () => {
    return currentStep === "appearance-accessories" || currentStep === "personality";
  };

  const handleNext = () => {
    if (isLastStep) {
      handleFinish();
    } else {
      goToNextStep();
    }
  };

  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "disclaimer":
        return <DisclaimerStep onAutoAdvance={goToNextStep} />;
      
      case "name":
        return (
          <NameStep
            name={name}
            onNameChange={setName}
            onAutoAdvance={goToNextStep}
          />
        );
      
      case "role":
        return (
          <RoleStep
            selectedRole={role}
            onRoleChange={setRole}
            onAutoAdvance={goToNextStep}
          />
        );
      
      case "appearance-age":
        return (
          <AppearanceAgeStep
            selectedAge={appearanceAge}
            onAgeChange={setAppearanceAge}
            onAutoAdvance={goToNextStep}
          />
        );
      
      case "appearance-color":
        return (
          <AppearanceColorStep
            selectedColor={appearanceColor}
            customColor={appearanceColorCustom}
            onColorChange={setAppearanceColor}
            onCustomColorChange={setAppearanceColorCustom}
            onAutoAdvance={goToNextStep}
          />
        );
      
      case "appearance-type":
        return (
          <AppearanceTypeStep
            selectedType={appearanceType}
            customType={appearanceTypeCustom}
            onTypeChange={setAppearanceType}
            onCustomTypeChange={setAppearanceTypeCustom}
            onAutoAdvance={goToNextStep}
          />
        );
      
      case "appearance-accessories":
        return (
          <AppearanceAccessoriesStep
            accessory1={appearanceAccessory1}
            accessory2={appearanceAccessory2}
            onAccessory1Change={setAppearanceAccessory1}
            onAccessory2Change={setAppearanceAccessory2}
          />
        );
      
      case "personality":
        return (
          <PersonalityStep
            selectedTraits={personality}
            onTraitToggle={togglePersonalityTrait}
          />
        );
      
      default:
        return null;
    }
  };

  const appearanceDescription = summarizeAppearance({
    appearanceAge,
    appearanceColor,
    appearanceColorCustom,
    appearanceType,
    appearanceTypeCustom,
    appearanceAccessory1,
    appearanceAccessory2,
  });

  return (
    <FullScreenDialog open={open} onOpenChange={handleClose}>
      <FullScreenDialogContent className="bg-gradient-to-b from-white to-primary/5">
        {/* Header */}
        <FullScreenDialogHeader className="flex-shrink-0 px-8 py-6 border-b border-primary/20">
          <FullScreenDialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {initialCharacter ? "Edit Magical Character" : "Create a Magical Character"}
          </FullScreenDialogTitle>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStepIndex + 1} of {totalSteps}
            </p>
          </div>
        </FullScreenDialogHeader>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 px-8 py-6">
              <div className="max-w-2xl mx-auto">
                {renderCurrentStep()}
              </div>
            </ScrollArea>

            {/* Navigation */}
            <div className="flex-shrink-0 px-8 py-6">
              <div className="max-w-2xl mx-auto">
                <CharacterStepNavigation
                  onBack={goToPrevStep}
                  onNext={handleNext}
                  onSkip={canSkip() ? goToNextStep : undefined}
                  canGoBack={!isFirstStep}
                  canGoNext={canGoNext()}
                  canSkip={canSkip()}
                  isLastStep={isLastStep}
                />
              </div>
            </div>
          </div>

          {/* Preview sidebar */}
          <div className="w-80 border-l border-primary/20 bg-white/50 p-6">
            <CharacterPreview
              name={name}
              role={role}
              personality={personality}
              appearanceDescription={appearanceDescription}
            />
          </div>
        </div>
      </FullScreenDialogContent>
    </FullScreenDialog>
  );
};

export default CharacterDialog;
