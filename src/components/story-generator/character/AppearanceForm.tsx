import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Add Badge import

// Age options for the appearance dropdown with emojis - ordered chronologically
const AGE_OPTIONS = [
  { value: "baby", label: "baby", emoji: "👶" },
  { value: "little", label: "little", emoji: "🧒" },
  { value: "young", label: "young", emoji: "👧" },
  { value: "teen", label: "teen", emoji: "👩‍🎤" },
  { value: "grown-up", label: "grown-up", emoji: "👩‍🚀" },
];

// Color options for the appearance dropdown
const COLOR_OPTIONS = ["golden", "dark", "white", "red", "blue", "green", "brown", "other"];

// Character type options for the appearance dropdown with emojis
const CHARACTER_TYPE_OPTIONS = [
  { value: "girl", label: "girl", emoji: "👸" },
  { value: "boy", label: "boy", emoji: "👦" },
  { value: "dragon", label: "dragon", emoji: "🐉" },
  { value: "lion", label: "lion", emoji: "🦁" },
  { value: "puppy", label: "puppy", emoji: "🐶" },
  { value: "fairy", label: "fairy", emoji: "🧚‍♀️" },
  { value: "robot", label: "robot", emoji: "🤖" },
  { value: "wizard", label: "wizard", emoji: "🧙‍♀️" },
  { value: "alien", label: "alien", emoji: "👽" },
  { value: "other", label: "other", emoji: "👤" },
];

// Possible badge color variants for playful tag colors
const BADGE_VARIANTS = [
  "default", "secondary", "destructive", "outline"
];

// Helper assigns a badge variant deterministically based on key
function getBadgeVariant(key: string) {
  const hash = Array.from(key).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return BADGE_VARIANTS[hash % BADGE_VARIANTS.length] as any;
}

interface AppearanceFormProps {
  onAppearanceChange: (appearance: string) => void;
  initialAppearance?: string;
}

const AppearanceForm: React.FC<AppearanceFormProps> = ({ onAppearanceChange, initialAppearance }) => {
  // Mad Lib-style appearance state
  const [appearanceAge, setAppearanceAge] = useState("young");
  const [appearanceColor, setAppearanceColor] = useState("dark");
  const [appearanceColorCustom, setAppearanceColorCustom] = useState("");
  const [appearanceType, setAppearanceType] = useState("girl");
  const [appearanceTypeCustom, setAppearanceTypeCustom] = useState("");
  const [appearanceAccessory1, setAppearanceAccessory1] = useState("");
  const [appearanceAccessory2, setAppearanceAccessory2] = useState("");
  const [generatedAppearance, setGeneratedAppearance] = useState("");

  // Initialize fields from initialAppearance prop if provided
  useEffect(() => {
    if (initialAppearance) {
      // Try to parse parts of the sentence "A young dark girl with X and Y." for editing experience
      const initial = initialAppearance;

      // Basic matching:
      // A {age} {color} {type} [with {accessory} [and {accessory2}]].
      let age = "young";
      let color = "dark";
      let type = "girl";
      let accessory1 = "";
      let accessory2 = "";

      const ageMatch = initial.match(/A ([a-zA-Z-]+)/);
      if (ageMatch) age = ageMatch[1];
      // Attempt crude color detection (the word after age)
      const colorMatch = initial.match(/A [a-zA-Z-]+ ([a-zA-Z]+) /);
      if (colorMatch) color = colorMatch[1];
      // Attempt crude type detection (the word after color)
      const typeMatch = initial.match(/A [a-zA-Z-]+ [a-zA-Z]+ ([a-zA-Z]+)/);
      if (typeMatch) type = typeMatch[1];
      // Accessory 1
      const accessory1Match = initial.match(/with ([^and\.]+)/);
      if (accessory1Match) accessory1 = accessory1Match[1].trim();
      // Accessory 2
      const accessory2Match = initial.match(/and ([^\.]+)/);
      if (accessory2Match) accessory2 = accessory2Match[1].trim();

      setAppearanceAge(age);
      setAppearanceColor(color);
      setAppearanceColorCustom("");
      setAppearanceType(type);
      setAppearanceTypeCustom("");
      setAppearanceAccessory1(accessory1);
      setAppearanceAccessory2(accessory2);
    }
  }, [initialAppearance]);

  // Effect to generate the appearance sentence when inputs change
  useEffect(() => {
    const color = appearanceColor === "other" ? appearanceColorCustom : appearanceColor;
    const type = appearanceType === "other" ? appearanceTypeCustom : appearanceType;
    
    let sentence = `A ${appearanceAge} ${color} ${type}`;
    
    if (appearanceAccessory1) {
      sentence += ` with ${appearanceAccessory1}`;
      
      if (appearanceAccessory2) {
        sentence += ` and ${appearanceAccessory2}`;
      }
    } else if (appearanceAccessory2) {
      sentence += ` with ${appearanceAccessory2}`;
    }
    
    sentence += ".";
    setGeneratedAppearance(sentence);
    
    // Update the parent component with the generated sentence
    onAppearanceChange(sentence);
  }, [
    appearanceAge,
    appearanceColor,
    appearanceColorCustom,
    appearanceType,
    appearanceTypeCustom,
    appearanceAccessory1,
    appearanceAccessory2,
    onAppearanceChange
  ]);

  const resetFields = () => {
    setAppearanceAge("young");
    setAppearanceColor("dark");
    setAppearanceColorCustom("");
    setAppearanceType("girl");
    setAppearanceTypeCustom("");
    setAppearanceAccessory1("");
    setAppearanceAccessory2("");
  };

  // Helper to create the colored-tag styled preview sentence
  function renderAppearancePreview() {
    const colorValue = appearanceColor === "other" ? appearanceColorCustom : appearanceColor;
    const typeValue = appearanceType === "other" ? appearanceTypeCustom : appearanceType;
    const tags = [
      { label: appearanceAge, key: "age" },
      { label: colorValue, key: "color" },
      { label: typeValue, key: "type" },
    ];
    let sentence: React.ReactNode[] = [];
    // "A [age] [color] [type]" as tags
    sentence.push("A ");
    tags.forEach((item, idx) => {
      sentence.push(
        <Badge
          key={item.key}
          variant={getBadgeVariant(item.label + item.key)}
          className="mx-1 text-base capitalize px-3 py-2 rounded-lg"
          style={{
            // Lighten default/outline for 'default', extra fun.
            backgroundColor: item.label === "other" ? "#ececec" : undefined,
            fontWeight: 500,
            fontSize: "1.1em"
          }}
        >
          {item.label}
        </Badge>
      );
      if (idx < tags.length - 1) sentence.push(" ");
    });
    // Accessories
    if (appearanceAccessory1 || appearanceAccessory2) {
      sentence.push(" with ");
      if (appearanceAccessory1) {
        sentence.push(
          <Badge
            key="acc1"
            variant={getBadgeVariant(appearanceAccessory1 + "acc1")}
            className="mx-1 text-base capitalize px-3 py-2 rounded-lg"
            style={{ fontWeight: 500, fontSize: "1.1em" }}
          >
            {appearanceAccessory1}
          </Badge>
        );
        if (appearanceAccessory2) {
          sentence.push(" and ");
          sentence.push(
            <Badge
              key="acc2"
              variant={getBadgeVariant(appearanceAccessory2 + "acc2")}
              className="mx-1 text-base capitalize px-3 py-2 rounded-lg"
              style={{ fontWeight: 500, fontSize: "1.1em" }}
            >
              {appearanceAccessory2}
            </Badge>
          );
        }
      } else if (appearanceAccessory2) {
        sentence.push(
          <Badge
            key="acc2"
            variant={getBadgeVariant(appearanceAccessory2 + "acc2")}
            className="mx-1 text-base capitalize px-3 py-2 rounded-lg"
            style={{ fontWeight: 500, fontSize: "1.1em" }}
          >
            {appearanceAccessory2}
          </Badge>
        );
      }
    }
    sentence.push(".");
    return sentence;
  }

  return (
    <div className="space-y-4">
      <Label className="text-lg">What does your character look like?</Label>
      
      <div className="bg-primary/5 p-6 rounded-xl space-y-5 border border-primary/20">
        <div className="grid grid-cols-2 gap-4">
          {/* Age Dropdown with emoji */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg">Age</Label>
            <Select 
              value={appearanceAge} 
              onValueChange={setAppearanceAge}
            >
              <SelectTrigger id="age" className="bg-white text-lg p-5">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {AGE_OPTIONS.map(age => (
                  <SelectItem key={age.value} value={age.value} className="text-lg p-3">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{age.emoji}</span>
                      <span>{age.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Color Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="color" className="text-lg">Color</Label>
            <Select 
              value={appearanceColor} 
              onValueChange={setAppearanceColor}
            >
              <SelectTrigger id="color" className="bg-white text-lg p-5">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {COLOR_OPTIONS.map(color => (
                  <SelectItem key={color} value={color} className="text-lg p-3">
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Custom color input if "other" is selected */}
            {appearanceColor === "other" && (
              <Input 
                value={appearanceColorCustom}
                onChange={(e) => setAppearanceColorCustom(e.target.value)}
                placeholder="Type a color..."
                className="mt-2 p-5 text-lg"
              />
            )}
          </div>
        </div>
        
        {/* Character Type Dropdown with emoji */}
        <div className="space-y-2">
          <Label htmlFor="characterType" className="text-lg">Character Type</Label>
          <Select 
            value={appearanceType} 
            onValueChange={setAppearanceType}
          >
            <SelectTrigger id="characterType" className="bg-white text-lg p-5">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {CHARACTER_TYPE_OPTIONS.map(type => (
                <SelectItem key={type.value} value={type.value} className="text-lg p-3">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{type.emoji}</span>
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Custom type input if "other" is selected */}
          {appearanceType === "other" && (
            <Input 
              value={appearanceTypeCustom}
              onChange={(e) => setAppearanceTypeCustom(e.target.value)}
              placeholder="Type a character type..."
              className="mt-2 p-5 text-lg"
            />
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Accessory 1 Input */}
          <div className="space-y-2">
            <Label htmlFor="accessory1" className="text-lg">Accessory 1</Label>
            <Input
              id="accessory1"
              value={appearanceAccessory1}
              onChange={(e) => setAppearanceAccessory1(e.target.value)}
              placeholder="e.g., magic wand, robot arm"
              className="p-5 text-lg"
            />
          </div>
          
          {/* Accessory 2 Input */}
          <div className="space-y-2">
            <Label htmlFor="accessory2" className="text-lg">Accessory 2</Label>
            <Input
              id="accessory2"
              value={appearanceAccessory2}
              onChange={(e) => setAppearanceAccessory2(e.target.value)}
              placeholder="e.g., cape, lab coat"
              className="p-5 text-lg"
            />
          </div>
        </div>
        
        {/* Preview of the generated appearance */}
        <div className="mt-4 p-5 bg-white rounded-xl border shadow-sm">
          <p className="text-md text-muted-foreground mb-2">Preview:</p>
          <div className="flex flex-wrap items-center gap-y-2">
            {renderAppearancePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AppearanceForm, AGE_OPTIONS, COLOR_OPTIONS, CHARACTER_TYPE_OPTIONS };
