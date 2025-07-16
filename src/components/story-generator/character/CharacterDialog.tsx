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
import { useIsMobile } from "@/hooks/use-mobile";
import CharacterPreview from "./CharacterPreview";
import CharacterStepNavigation from "./CharacterStepNavigation";
import NameStep from "./steps/NameStep";
import RoleStep from "./steps/RoleStep";
import AppearanceAgeStep from "./steps/AppearanceAgeStep";
import AppearanceColorStep from "./steps/AppearanceColorStep";
import AppearanceTypeStep from "./steps/AppearanceTypeStep";
import AppearanceEyesStep from "./steps/AppearanceEyesStep";
import AppearanceHairStep from "./steps/AppearanceHairStep";
import AppearanceAccessoriesStep from "./steps/AppearanceAccessoriesStep";
import PersonalityStep from "./steps/PersonalityStep";

// Helper to synthesize appearance preview summary for display & saving
function summarizeAppearance({
  appearanceAge,
  appearanceColor,
  appearanceColorCustom,
  appearanceType,
  appearanceTypeCustom,
  appearanceEyes,
  appearanceEyesCustom,
  appearanceHairStyle,
  appearanceHairStyleCustom,
  appearanceHairColor,
  appearanceHairColorCustom,
  appearanceAccessories,
}: {
  appearanceAge: string;
  appearanceColor: string;
  appearanceColorCustom: string;
  appearanceType: string;
  appearanceTypeCustom: string;
  appearanceEyes: string;
  appearanceEyesCustom: string;
  appearanceHairStyle: string;
  appearanceHairStyleCustom: string;
  appearanceHairColor: string;
  appearanceHairColorCustom: string;
  appearanceAccessories: string[];
}) {
  // Choose custom or regular values
  const color = appearanceColor === "other" ? appearanceColorCustom : appearanceColor;
  const type = appearanceType === "other" ? appearanceTypeCustom : appearanceType;
  const eyes = appearanceEyes === "other" ? appearanceEyesCustom : appearanceEyes;
  const hairStyle = appearanceHairStyle === "other" ? appearanceHairStyleCustom : appearanceHairStyle;
  const hairColor = appearanceHairColor === "other" ? appearanceHairColorCustom : appearanceHairColor;

  // Compose the "A" or "An" logic (simple: check for vowel)
  const firstWord = appearanceAge || color;
  const article = firstWord && /^[aeiou]/i.test(firstWord) ? "An" : "A";

  // Compose main phrase: "A {age} {skin colour} {Character type} with {eyes colour}, {Hair colour}, {accessories}"
  let phrase = `${article}`;
  if (appearanceAge) phrase += ` ${appearanceAge}`;
  if (color) phrase += ` ${color}`;
  if (type) phrase += ` ${type}`;
  
  // Add "with" clause
  const withItems = [];
  if (eyes) withItems.push(eyes);
  
  // Combine hair style and color
  if (hairStyle && hairColor) {
    withItems.push(`${hairStyle} ${hairColor} hair`);
  } else if (hairStyle) {
    withItems.push(`${hairStyle} hair`);
  } else if (hairColor) {
    withItems.push(`${hairColor} hair`);
  }

  // Group accessories by verb
  const ACCESSORY_OPTIONS = [
    { value: "crown", label: "Crown", emoji: "👑", verb: "wearing" },
    { value: "hat", label: "Hat", emoji: "🎩", verb: "wearing" },
    { value: "glasses", label: "Glasses", emoji: "👓", verb: "wearing" },
    { value: "necklace", label: "Necklace", emoji: "📿", verb: "wearing" },
    { value: "cape", label: "Cape", emoji: "🦸", verb: "wearing" },
    { value: "wings", label: "Wings", emoji: "🪶", verb: "having" },
    { value: "sword", label: "Sword", emoji: "⚔️", verb: "holding" },
    { value: "wand", label: "Wand", emoji: "🪄", verb: "holding" },
    { value: "shield", label: "Shield", emoji: "🛡️", verb: "holding" },
    { value: "bow", label: "Bow", emoji: "🏹", verb: "holding" },
    { value: "backpack", label: "Backpack", emoji: "🎒", verb: "wearing" },
    { value: "boots", label: "Boots", emoji: "👢", verb: "wearing" },
    { value: "scarf", label: "Scarf", emoji: "🧣", verb: "wearing" },
    { value: "gloves", label: "Gloves", emoji: "🧤", verb: "wearing" },
    { value: "belt", label: "Belt", emoji: "👓", verb: "wearing" },
  ];

  if (appearanceAccessories.length > 0) {
    // Group accessories by verb
    const accessoryGroups: { [key: string]: string[] } = {};
    
    appearanceAccessories.forEach(accessory => {
      const option = ACCESSORY_OPTIONS.find(opt => opt.value === accessory);
      const verb = option ? option.verb : "having";
      
      if (!accessoryGroups[verb]) {
        accessoryGroups[verb] = [];
      }
      
      // Use the label if it's a predefined option, otherwise use the custom text
      const displayName = option ? option.label.toLowerCase() : accessory;
      accessoryGroups[verb].push(displayName);
    });

    // Create phrases for each verb group
    Object.entries(accessoryGroups).forEach(([verb, items]) => {
      if (items.length === 1) {
        withItems.push(`${verb} ${items[0]}`);
      } else if (items.length === 2) {
        withItems.push(`${verb} ${items[0]} and ${items[1]}`);
      } else {
        withItems.push(`${verb} ${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
      }
    });
  }

  if (withItems.length > 0) {
    phrase += " with ";
    if (withItems.length === 1) {
      phrase += withItems[0];
    } else if (withItems.length === 2) {
      phrase += `${withItems[0]} and ${withItems[1]}`;
    } else {
      phrase += withItems.slice(0, -1).join(", ") + " and " + withItems[withItems.length - 1];
    }
  }

  phrase += ".";

  // If nothing filled in, avoid "A  ." (return empty).
  if (
    !appearanceAge && !color && !type && withItems.length === 0
  ) return "";

  return phrase;
}

interface AppearanceFields {
  appearanceAge: string;
  appearanceColor: string;
  appearanceColorCustom: string;
  appearanceType: string;
  appearanceTypeCustom: string;
  appearanceEyes: string;
  appearanceEyesCustom: string;
  appearanceHairStyle: string;
  appearanceHairStyleCustom: string;
  appearanceHairColor: string;
  appearanceHairColorCustom: string;
  appearanceAccessories: string[];
}

interface CharacterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCharacter: (character: Omit<Character, "id">) => void;
  initialCharacter?: Character;
}

const initialAppearanceFields: AppearanceFields = {
  appearanceAge: "",
  appearanceColor: "",
  appearanceColorCustom: "",
  appearanceType: "",
  appearanceTypeCustom: "",
  appearanceEyes: "",
  appearanceEyesCustom: "",
  appearanceHairStyle: "",
  appearanceHairStyleCustom: "",
  appearanceHairColor: "",
  appearanceHairColorCustom: "",
  appearanceAccessories: [],
};

const CharacterDialog: React.FC<CharacterDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddCharacter,
  initialCharacter
}) => {
  const isMobile = useIsMobile();
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
        
        // Restore appearance fields if they exist, otherwise use empty fields
        if (initialCharacter.appearanceFields) {
          setAppearanceFields(initialCharacter.appearanceFields);
        } else {
          setAppearanceFields(initialAppearanceFields);
        }
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

  const handleAppearanceField = (field: keyof AppearanceFields, value: string | string[]) => {
    setAppearanceFields((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "appearanceColor" && value !== "other" ? { appearanceColorCustom: "" } : {}),
      ...(field === "appearanceType" && value !== "other" ? { appearanceTypeCustom: "" } : {}),
      ...(field === "appearanceEyes" && value !== "other" ? { appearanceEyesCustom: "" } : {}),
      ...(field === "appearanceHairStyle" && value !== "other" ? { appearanceHairStyleCustom: "" } : {}),
      ...(field === "appearanceHairColor" && value !== "other" ? { appearanceHairColorCustom: "" } : {}),
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

  const clearCurrentStepValue = () => {
    switch (currentStep) {
      case "name":
        setName("");
        break;
      case "role":
        setRole("Hero");
        break;
      case "personality":
        setPersonality([]);
        break;
      case "appearance-type":
        handleAppearanceField("appearanceType", "");
        handleAppearanceField("appearanceTypeCustom", "");
        break;
      case "appearance-age":
        handleAppearanceField("appearanceAge", "");
        break;
      case "appearance-color":
        handleAppearanceField("appearanceColor", "");
        handleAppearanceField("appearanceColorCustom", "");
        break;
      case "appearance-eyes":
        handleAppearanceField("appearanceEyes", "");
        handleAppearanceField("appearanceEyesCustom", "");
        break;
      case "appearance-hair":
        handleAppearanceField("appearanceHairStyle", "");
        handleAppearanceField("appearanceHairStyleCustom", "");
        handleAppearanceField("appearanceHairColor", "");
        handleAppearanceField("appearanceHairColorCustom", "");
        break;
      case "appearance-accessories":
        handleAppearanceField("appearanceAccessories", []);
        break;
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case "name":
        return name.trim().length > 0;
      case "role":
        return role.length > 0;
      case "personality":
        return personality.length > 0;
      case "appearance-type":
        return appearanceFields.appearanceType.length > 0 && 
               (appearanceFields.appearanceType !== "other" || appearanceFields.appearanceTypeCustom.trim().length > 0);
      case "appearance-age":
        return true; // Optional step
      case "appearance-color":
        return appearanceFields.appearanceColor.length > 0 && 
               (appearanceFields.appearanceColor !== "other" || appearanceFields.appearanceColorCustom.trim().length > 0);
      case "appearance-eyes":
        return true; // Optional step
      case "appearance-hair":
        return true; // Optional step
      case "appearance-accessories":
        return appearanceFields.appearanceAccessories.length > 0;
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
    
    const appearance = summarizeAppearance(appearanceFields);
    onAddCharacter({
      name,
      appearance,
      personality,
      role,
      appearanceFields,
    });
    resetCharacter();
    onOpenChange(false);
  };

  // Update the generatedAppearance calculation to use the new structure
  const generatedAppearance = summarizeAppearance(appearanceFields);

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
      case "personality":
        return (
          <PersonalityStep
            selectedTraits={personality}
            onTraitToggle={togglePersonalityTrait}
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
      case "appearance-eyes":
        return (
          <AppearanceEyesStep
            selectedEyes={appearanceFields.appearanceEyes}
            customEyes={appearanceFields.appearanceEyesCustom}
            onEyesChange={(v: string) => handleAppearanceField("appearanceEyes", v)}
            onCustomEyesChange={(v: string) => handleAppearanceField("appearanceEyesCustom", v)}
            onNext={handleNext}
          />
        );
      case "appearance-hair":
        return (
          <AppearanceHairStep
            selectedHairStyle={appearanceFields.appearanceHairStyle}
            selectedHairColor={appearanceFields.appearanceHairColor}
            customHairStyle={appearanceFields.appearanceHairStyleCustom}
            customHairColor={appearanceFields.appearanceHairColorCustom}
            onHairStyleChange={(v: string) => handleAppearanceField("appearanceHairStyle", v)}
            onHairColorChange={(v: string) => handleAppearanceField("appearanceHairColor", v)}
            onCustomHairStyleChange={(v: string) => handleAppearanceField("appearanceHairStyleCustom", v)}
            onCustomHairColorChange={(v: string) => handleAppearanceField("appearanceHairColorCustom", v)}
            onNext={handleNext}
          />
        );
      case "appearance-accessories":
        return (
          <AppearanceAccessoriesStep
            accessories={appearanceFields.appearanceAccessories}
            onAccessoriesChange={(v: string[]) => handleAppearanceField("appearanceAccessories", v)}
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
        <FullScreenDialogHeader className={`flex-shrink-0 ${isMobile ? 'px-4 py-3' : 'px-8 py-6'} border-b border-primary/20`}>
          <FullScreenDialogTitle className={`${isMobile ? 'text-lg' : 'text-3xl'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-center`}>
            {initialCharacter ? "Edit Magical Character" : "Create a Magical Character"}
          </FullScreenDialogTitle>
        </FullScreenDialogHeader>

        {/* Content - Mobile optimized layout */}
        {isMobile ? (
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-4 py-4">
              {renderCurrentStep()}
              
              {/* Navigation buttons right after content */}
              <div className="mt-8 pb-32">
                <CharacterStepNavigation
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                  onBack={goToPreviousStep}
                  onNext={handleNext}
                  onSkip={handleSkip}
                  onClearCurrentStep={clearCurrentStepValue}
                  canProceed={isCurrentStepValid()}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Main Content - Desktop */}
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
                    onClearCurrentStep={clearCurrentStepValue}
                    canProceed={isCurrentStepValid()}
                  />
                </div>
              </div>
            </div>

            {/* Preview Sidebar - Desktop only */}
            <div className="w-80 border-l border-primary/20 bg-primary/5 p-6">
              <CharacterPreview
                name={name}
                role={role}
                generatedAppearance={generatedAppearance}
                personality={personality}
              />
            </div>
          </div>
        )}
      </FullScreenDialogContent>
    </FullScreenDialog>
  );
};

export default CharacterDialog;
