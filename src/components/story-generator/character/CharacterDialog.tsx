import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Character } from "../constants";
import { AppearanceForm } from "./AppearanceForm";
import { RoleSelector } from "./RoleSelector";
import CharacterNameInput from "./CharacterNameInput";
import PersonalitySelector from "./PersonalitySelector";

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
  // These fields are now explicit, not just "appearance" as a string
  const [name, setName] = useState("");
  const [role, setRole] = useState("Hero");
  const [personality, setPersonality] = useState<string[]>([]);
  const [appearanceFields, setAppearanceFields] = useState<AppearanceFields>(initialAppearanceFields);

  // Reset or hydrate fields on open
  useEffect(() => {
    if (open && initialCharacter) {
      setName(initialCharacter.name || "");
      setRole(initialCharacter.role || "Hero");
      setPersonality(initialCharacter.personality || []);
      // Try to parse appearance to fill the fields if possible (or ignore if not parseable)
      setAppearanceFields({
        ...initialAppearanceFields,
        // This is an area to improve: parsing the saved summary, or just keep their last appearance values as fields in the data model for editing.
        // Fallback: keep them blank.
      });
    } else if (open && !initialCharacter) {
      setName("");
      setRole("Hero");
      setPersonality([]);
      setAppearanceFields(initialAppearanceFields);
    }
    // eslint-disable-next-line
  }, [open, initialCharacter]);

  const handleAppearanceField = (field: keyof AppearanceFields, value: string) => {
    setAppearanceFields((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "appearanceColor" && value !== "other" ? { appearanceColorCustom: "" } : {}),
      ...(field === "appearanceType" && value !== "other" ? { appearanceTypeCustom: "" } : {}),
    }));
  };

  // Handlers for each prop
  const propsForForm = {
    appearanceAge: appearanceFields.appearanceAge,
    onAppearanceAgeChange: (v: string) => handleAppearanceField("appearanceAge", v),
    appearanceColor: appearanceFields.appearanceColor,
    onAppearanceColorChange: (v: string) => handleAppearanceField("appearanceColor", v),
    appearanceColorCustom: appearanceFields.appearanceColorCustom,
    onAppearanceColorCustomChange: (v: string) => handleAppearanceField("appearanceColorCustom", v),
    appearanceType: appearanceFields.appearanceType,
    onAppearanceTypeChange: (v: string) => handleAppearanceField("appearanceType", v),
    appearanceTypeCustom: appearanceFields.appearanceTypeCustom,
    onAppearanceTypeCustomChange: (v: string) => handleAppearanceField("appearanceTypeCustom", v),
    appearanceAccessory1: appearanceFields.appearanceAccessory1,
    onAppearanceAccessory1Change: (v: string) => handleAppearanceField("appearanceAccessory1", v),
    appearanceAccessory2: appearanceFields.appearanceAccessory2,
    onAppearanceAccessory2Change: (v: string) => handleAppearanceField("appearanceAccessory2", v),
    generatedAppearance: summarizeAppearance({ ...appearanceFields }),
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
  };

  const handleAddCharacter = () => {
    if (!name) return;
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

  return (
    <Dialog open={open} onOpenChange={(newOpenState) => {
      if (!newOpenState) resetCharacter();
      onOpenChange(newOpenState);
    }}>
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] max-h-[90vh] touch-pan-y bg-gradient-to-b from-white to-primary/5 border-2 border-primary/30 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {initialCharacter ? "Edit Magical Character" : "Create a Magical Character"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] touch-pan-y">
          <div className="space-y-5 py-4 px-1">
            {/* Role selection at the top */}
            <RoleSelector 
              selectedRole={role}
              onRoleChange={setRole}
            />
            <CharacterNameInput
              name={name}
              onNameChange={setName}
            />
            <AppearanceForm
              {...propsForForm}
            />
            <PersonalitySelector
              selectedTraits={personality}
              onTraitToggle={togglePersonalityTrait}
            />
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={handleAddCharacter}
            className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
          >
            {initialCharacter ? "Save Changes" : "Add Character"} ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDialog;
