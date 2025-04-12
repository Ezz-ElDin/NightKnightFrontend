
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, Sparkles, Star, BookText, Map, History, Palette, Music, Languages, SmilePlus, Dumbbell, Brain, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface Character {
  id: string;
  name: string;
  appearance: string;
  personality: string[];
  role: string;
}

interface StorySettingsProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}

const GENRES = [
  { id: "adventure", name: "Adventure", icon: "🏞️", color: "#a2f7b5", textColor: "#3a8c5b", image: "/lovable-uploads/51f1dc72-25cc-48e4-988f-64eed7e2d51e.png" },
  { id: "fantasy", name: "Fantasy", icon: "🧙‍♂️", color: "#b3e0ff", textColor: "#3a5e8c", image: null },
  { id: "mystery", name: "Mystery", icon: "🔍", color: "#d9b3ff", textColor: "#673a8c", image: null },
  { id: "friendship", name: "Friendship", icon: "👭", color: "#ffb3d9", textColor: "#8c3a67", image: null },
  { id: "animals", name: "Animals", icon: "🐾", color: "#f7e8a2", textColor: "#8c6f3a", image: null },
  { id: "magic", name: "Magic", icon: "✨", color: "#ffccff", textColor: "#8c3a8c", image: null },
];

const TONES = [
  { id: "friendly", name: "Friendly", icon: "😊", color: "#a2f7b5", textColor: "#3a8c5b", image: null },
  { id: "playful", name: "Playful", icon: "😄", color: "#ffda99", textColor: "#8c6f3a", image: null },
  { id: "educational", name: "Educational", icon: "📚", color: "#cafffa", textColor: "#3a8c84", image: null },
  { id: "inspirational", name: "Inspirational", icon: "🌟", color: "#fff099", textColor: "#8c7e3a", image: null },
  { id: "soothing", name: "Soothing", icon: "😴", color: "#b3d9ff", textColor: "#3a5e8c", image: null },
  { id: "silly", name: "Silly", icon: "🤪", color: "#ffb3fc", textColor: "#8c3a8a", image: null },
];

const PERSONALITY_TRAITS = [
  "Brave", "Curious", "Shy", "Playful", "Wise", "Kind",
  "Clever", "Adventurous", "Funny", "Loyal", "Mischievous"
];

const CHARACTER_ROLES = [
  "Hero", "Sidekick", "Mentor", "Villain", "Friend", "Guide"
];

const AGE_RANGES = [
  "3-5", "6-8", "9-12"
];

const LANGUAGES = [
  { id: "English", flag: "🇺🇸" },
  { id: "Spanish", flag: "🇪🇸" },
  { id: "French", flag: "🇫🇷" },
  { id: "German", flag: "🇩🇪" },
  { id: "Chinese", flag: "🇨🇳" },
];

const StorySettings: React.FC<StorySettingsProps> = ({ storyData, updateStoryData }) => {
  const [characterDialogOpen, setCharacterDialogOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>({
    id: "",
    name: "",
    appearance: "",
    personality: [],
    role: "Hero"
  });

  const handleGenreSelect = (genreId: string) => {
    updateStoryData({ genre: genreId });
  };

  const handleToneSelect = (toneId: string) => {
    updateStoryData({ tone: toneId });
  };

  const addCharacter = () => {
    if (!currentCharacter.name) return;
    
    const newCharacter = {
      ...currentCharacter,
      id: Date.now().toString(),
    };
    
    updateStoryData({
      characters: [...storyData.characters, newCharacter]
    });
    
    setCurrentCharacter({
      id: "",
      name: "",
      appearance: "",
      personality: [],
      role: "Hero"
    });
    
    setCharacterDialogOpen(false);
  };

  const removeCharacter = (id: string) => {
    updateStoryData({
      characters: storyData.characters.filter(char => char.id !== id)
    });
  };

  const togglePersonalityTrait = (trait: string) => {
    setCurrentCharacter(prev => {
      const traits = prev.personality.includes(trait)
        ? prev.personality.filter(t => t !== trait)
        : [...prev.personality, trait];
      
      return { ...prev, personality: traits };
    });
  };

  // Get the appropriate icon for a genre
  const getGenreIcon = (genreId: string) => {
    switch(genreId) {
      case "adventure": return <Map className="h-10 w-10" />;
      case "fantasy": return <Sparkles className="h-10 w-10" />;
      case "mystery": return <BookText className="h-10 w-10" />;
      case "friendship": return <SmilePlus className="h-10 w-10" />;
      case "animals": return <span className="text-4xl">🐾</span>;
      case "magic": return <Sparkles className="h-10 w-10" />;
      default: return <BookOpen className="h-10 w-10" />;
    }
  };

  // Get the appropriate icon for a tone
  const getToneIcon = (toneId: string) => {
    switch(toneId) {
      case "friendly": return <SmilePlus className="h-10 w-10" />;
      case "playful": return <span className="text-4xl">😄</span>;
      case "educational": return <Brain className="h-10 w-10" />;
      case "inspirational": return <Star className="h-10 w-10" />;
      case "soothing": return <span className="text-4xl">😴</span>;
      case "silly": return <span className="text-4xl">🤪</span>;
      default: return <span className="text-4xl">😊</span>;
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        Story Settings
      </h2>

      {/* Title Input */}
      <div className="space-y-3">
        <Label htmlFor="title">Story Title (Optional)</Label>
        <Input
          id="title"
          placeholder="What's your story called?"
          value={storyData.title}
          onChange={(e) => updateStoryData({ title: e.target.value })}
          className="input-kiddy"
        />
        <p className="text-sm text-muted-foreground">
          Leave blank and we'll generate a magical title for you!
        </p>
      </div>
      
      {/* Genre Selector */}
      <div className="space-y-3">
        <Label>Genre</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GENRES.map((genre) => (
            <div
              key={genre.id}
              className={cn(
                "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 flex flex-col items-center text-center aspect-[4/3] shadow-md border-2",
                storyData.genre === genre.id
                  ? "border-primary bg-primary/10 ring-4 ring-primary/30"
                  : `border-${genre.color}/50 hover:border-${genre.color}`
              )}
              onClick={() => handleGenreSelect(genre.id)}
              style={{
                backgroundColor: genre.color,
                color: genre.textColor,
                borderColor: storyData.genre === genre.id ? "#7E69AB" : genre.color,
              }}
            >
              <div className="mb-3">
                {getGenreIcon(genre.id)}
              </div>
              <div className="font-bold text-lg mt-auto">
                {genre.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tone Selector */}
      <div className="space-y-3">
        <Label>Tone</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {TONES.map((tone) => (
            <div
              key={tone.id}
              className={cn(
                "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 flex flex-col items-center text-center aspect-[4/3] shadow-md border-2",
                storyData.tone === tone.id
                  ? "border-primary bg-primary/10 ring-4 ring-primary/30"
                  : `border-${tone.color}/50 hover:border-${tone.color}`
              )}
              onClick={() => handleToneSelect(tone.id)}
              style={{
                backgroundColor: tone.color,
                color: tone.textColor,
                borderColor: storyData.tone === tone.id ? "#7E69AB" : tone.color,
              }}
            >
              <div className="mb-3">
                {getToneIcon(tone.id)}
              </div>
              <div className="font-bold text-lg mt-auto">
                {tone.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Age Range Selector */}
      <div className="space-y-3">
        <Label htmlFor="ageRange">Age Range</Label>
        <Select
          value={storyData.ageRange}
          onValueChange={(value) => updateStoryData({ ageRange: value })}
        >
          <SelectTrigger className="input-kiddy">
            <SelectValue placeholder="Select an age range" />
          </SelectTrigger>
          <SelectContent>
            {AGE_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range} years
                {range === "3-5" && " (Simple vocabulary, short sentences)"}
                {range === "6-8" && " (Growing vocabulary, longer stories)"}
                {range === "9-12" && " (Rich vocabulary, complex themes)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Moral/Theme Input */}
      <div className="space-y-3">
        <Label htmlFor="moral">Moral or Theme (Optional)</Label>
        <Input
          id="moral"
          placeholder="E.g., Kindness, Teamwork, Perseverance..."
          value={storyData.moral}
          onChange={(e) => updateStoryData({ moral: e.target.value })}
          className="input-kiddy"
        />
        <p className="text-sm text-muted-foreground">
          What lesson would you like your child to learn?
        </p>
      </div>
      
      {/* Character Input */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Characters</Label>
          <Button 
            variant="outline" 
            onClick={() => setCharacterDialogOpen(true)}
            className="border-primary text-primary hover:text-primary hover:bg-primary/10"
          >
            + Add Character
          </Button>
        </div>
        
        {storyData.characters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {storyData.characters.map((character) => (
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
          <DialogContent className="sm:max-w-[425px]">
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
              
              <div className="space-y-2">
                <Label htmlFor="appearance">Appearance</Label>
                <Textarea
                  id="appearance"
                  value={currentCharacter.appearance}
                  onChange={(e) => setCurrentCharacter({...currentCharacter, appearance: e.target.value})}
                  placeholder="What does this character look like?"
                />
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
                  <SelectTrigger>
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
      
      {/* Number of Pages */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label htmlFor="pages">Number of Pages</Label>
          <span className="font-medium">{storyData.pages}</span>
        </div>
        <Slider
          id="pages"
          min={5}
          max={20}
          step={1}
          value={[storyData.pages]}
          onValueChange={(value) => updateStoryData({ pages: value[0] })}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shorter</span>
          <span>Longer</span>
        </div>
      </div>
      
      {/* Language Selector */}
      <div className="space-y-3">
        <Label htmlFor="language">Language</Label>
        <Select
          value={storyData.language}
          onValueChange={(value) => updateStoryData({ language: value })}
        >
          <SelectTrigger className="input-kiddy">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.id}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StorySettings;
