
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
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
  // Use custom for color/type if selected
  const color = appearanceColor === "other" && appearanceColorCustom
    ? appearanceColorCustom
    : appearanceColor;
  const type = appearanceType === "other" && appearanceTypeCustom
    ? appearanceTypeCustom
    : appearanceType;
  // Accessory formatting: only include if provided
  const accessories = [appearanceAccessory1, appearanceAccessory2]
    .filter(a => a && a.trim())
    .join(", ");

  // Format: "[age] [color] [type][, accessories]"
  let preview = [appearanceAge, color, type]
    .filter(x => !!x && typeof x === "string")
    .join(" ");
  if (accessories) {
    preview += " (" + accessories + ")";
  }
  return preview.trim();
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
    // Use freshly generated summary for preview
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
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-primary/5 border-2 border-primary/30 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {initialCharacter ? "Edit Magical Character" : "Create a Magical Character"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
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
        <div className="flex justify-end">
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

