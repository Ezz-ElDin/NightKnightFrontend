
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Character, PERSONALITY_TRAITS, CHARACTER_ROLES } from "./constants";
import { Baby, User, Cat, Dog, Ghost, Crown, Wand2, Bot } from "lucide-react";

interface CharacterManagerProps {
  characters: Character[];
  updateCharacters: (characters: Character[]) => void;
}

// Age options for the appearance dropdown with icons
const AGE_OPTIONS = [
  { value: "young", label: "young", icon: <User className="h-4 w-4 mr-2" /> },
  { value: "little", label: "little", icon: <Baby className="h-4 w-4 mr-2" /> },
  { value: "teen", label: "teen", icon: <User className="h-4 w-4 mr-2" /> },
  { value: "baby", label: "baby", icon: <Baby className="h-4 w-4 mr-2" /> },
  { value: "grown-up", label: "grown-up", icon: <User className="h-4 w-4 mr-2" /> },
];

// Color options for the appearance dropdown
const COLOR_OPTIONS = ["golden", "dark", "white", "red", "blue", "green", "brown", "other"];

// Character type options for the appearance dropdown with icons
const CHARACTER_TYPE_OPTIONS = [
  { value: "boy", label: "boy", icon: <User className="h-4 w-4 mr-2" /> },
  { value: "girl", label: "girl", icon: <User className="h-4 w-4 mr-2" /> },
  { value: "dragon", label: "dragon", icon: <Cat className="h-4 w-4 mr-2" /> },
  { value: "lion", label: "lion", icon: <Cat className="h-4 w-4 mr-2" /> },
  { value: "puppy", label: "puppy", icon: <Dog className="h-4 w-4 mr-2" /> },
  { value: "alien", label: "alien", icon: <Ghost className="h-4 w-4 mr-2" /> },
  { value: "fairy", label: "fairy", icon: <Crown className="h-4 w-4 mr-2" /> },
  { value: "wizard", label: "wizard", icon: <Wand2 className="h-4 w-4 mr-2" /> },
  { value: "robot", label: "robot", icon: <Bot className="h-4 w-4 mr-2" /> },
  { value: "other", label: "other", icon: <User className="h-4 w-4 mr-2" /> },
];

const CharacterManager: React.FC<CharacterManagerProps> = ({ characters, updateCharacters }) => {
  const [characterDialogOpen, setCharacterDialogOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>({
    id: "",
    name: "",
    appearance: "",
    personality: [],
    role: "Hero"
  });

  // Mad Lib-style appearance state
  const [appearanceAge, setAppearanceAge] = useState("young");
  const [appearanceColor, setAppearanceColor] = useState("dark");
  const [appearanceColorCustom, setAppearanceColorCustom] = useState("");
  const [appearanceType, setAppearanceType] = useState("boy");
  const [appearanceTypeCustom, setAppearanceTypeCustom] = useState("");
  const [appearanceAccessory1, setAppearanceAccessory1] = useState("");
  const [appearanceAccessory2, setAppearanceAccessory2] = useState("");
  const [generatedAppearance, setGeneratedAppearance] = useState("");

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
    
    // Update the current character's appearance with the generated sentence
    setCurrentCharacter(prev => ({
      ...prev,
      appearance: sentence
    }));
  }, [
    appearanceAge,
    appearanceColor,
    appearanceColorCustom,
    appearanceType,
    appearanceTypeCustom,
    appearanceAccessory1,
    appearanceAccessory2
  ]);

  // Reset all appearance fields when dialog opens/closes
  const resetAppearanceFields = () => {
    setAppearanceAge("young");
    setAppearanceColor("dark");
    setAppearanceColorCustom("");
    setAppearanceType("boy");
    setAppearanceTypeCustom("");
    setAppearanceAccessory1("");
    setAppearanceAccessory2("");
  };

  const addCharacter = () => {
    if (!currentCharacter.name) return;
    
    const newCharacter = {
      ...currentCharacter,
      id: Date.now().toString(),
    };
    
    updateCharacters([...characters, newCharacter]);
    
    setCurrentCharacter({
      id: "",
      name: "",
      appearance: "",
      personality: [],
      role: "Hero"
    });
    
    resetAppearanceFields();
    setCharacterDialogOpen(false);
  };

  const removeCharacter = (id: string) => {
    updateCharacters(characters.filter(char => char.id !== id));
  };

  const togglePersonalityTrait = (trait: string) => {
    setCurrentCharacter(prev => {
      const traits = prev.personality.includes(trait)
        ? prev.personality.filter(t => t !== trait)
        : [...prev.personality, trait];
      
      return { ...prev, personality: traits };
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Characters</Label>
        <Button 
          variant="outline" 
          onClick={() => {
            resetAppearanceFields();
            setCharacterDialogOpen(true);
          }}
          className="border-primary text-primary hover:text-primary hover:bg-primary/10"
        >
          + Add Character
        </Button>
      </div>
      
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {characters.map((character) => (
            <div key={character.id} className="border-2 border-border rounded-xl p-3 relative">
              <button
                onClick={() => removeCharacter(character.id)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
              >
                ✕
              </button>
              <h3 className="font-bold">{character.name}</h3>
              <p className="text-sm text-muted-foreground">{character.role}</p>
              <p className="text-sm mt-1">{character.appearance}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {character.personality.map(trait => (
                  <span 
                    key={trait} 
                    className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 border-2 border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">No characters yet. Add some magic!</p>
        </div>
      )}
      
      <Dialog open={characterDialogOpen} onOpenChange={setCharacterDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create a Character</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="characterName">Name</Label>
              <Input
                id="characterName"
                value={currentCharacter.name}
                onChange={(e) => setCurrentCharacter({...currentCharacter, name: e.target.value})}
                placeholder="What's this character called?"
              />
            </div>
            
            <div className="space-y-4">
              <Label>What does your character look like?</Label>
              
              <div className="bg-primary/5 p-4 rounded-xl space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Age Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Select 
                      value={appearanceAge} 
                      onValueChange={setAppearanceAge}
                    >
                      <SelectTrigger id="age" className="bg-white">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_OPTIONS.map(age => (
                          <SelectItem key={age.value} value={age.value}>
                            <div className="flex items-center">
                              {age.icon}
                              {age.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Color Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Select 
                      value={appearanceColor} 
                      onValueChange={setAppearanceColor}
                    >
                      <SelectTrigger id="color" className="bg-white">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {COLOR_OPTIONS.map(color => (
                          <SelectItem key={color} value={color}>
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
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>
                
                {/* Character Type Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="characterType">Character Type</Label>
                  <Select 
                    value={appearanceType} 
                    onValueChange={setAppearanceType}
                  >
                    <SelectTrigger id="characterType" className="bg-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CHARACTER_TYPE_OPTIONS.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            {type.icon}
                            {type.label}
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
                      className="mt-2"
                    />
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Accessory 1 Input */}
                  <div className="space-y-2">
                    <Label htmlFor="accessory1">Accessory 1</Label>
                    <Input
                      id="accessory1"
                      value={appearanceAccessory1}
                      onChange={(e) => setAppearanceAccessory1(e.target.value)}
                      placeholder="e.g., round glasses, sparkly wings"
                    />
                  </div>
                  
                  {/* Accessory 2 Input */}
                  <div className="space-y-2">
                    <Label htmlFor="accessory2">Accessory 2</Label>
                    <Input
                      id="accessory2"
                      value={appearanceAccessory2}
                      onChange={(e) => setAppearanceAccessory2(e.target.value)}
                      placeholder="e.g., blue T-shirt, red cape"
                    />
                  </div>
                </div>
                
                {/* Preview of the generated appearance */}
                <div className="mt-4 p-3 bg-white rounded-xl border shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                  <p className="font-medium">{generatedAppearance}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Personality Traits</Label>
              <div className="grid grid-cols-2 gap-2">
                {PERSONALITY_TRAITS.map(trait => (
                  <div key={trait} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`trait-${trait}`}
                      checked={currentCharacter.personality.includes(trait)}
                      onCheckedChange={() => togglePersonalityTrait(trait)} 
                    />
                    <label 
                      htmlFor={`trait-${trait}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {trait}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role in Story</Label>
              <Select
                value={currentCharacter.role}
                onValueChange={(value) => setCurrentCharacter({...currentCharacter, role: value})}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {CHARACTER_ROLES.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={addCharacter}>Add Character</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterManager;
