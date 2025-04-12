
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BookOpen } from "lucide-react";
import { StorySettingsProps, AGE_RANGES, LANGUAGES } from "./constants";
import GenreSelector from "./GenreSelector";
import ToneSelector from "./ToneSelector";
import CharacterManager from "./CharacterManager";

const StorySettings: React.FC<StorySettingsProps> = ({ storyData, updateStoryData }) => {
  const handleGenreSelect = (genreId: string) => {
    updateStoryData({ genre: genreId });
  };

  const handleToneSelect = (toneId: string) => {
    updateStoryData({ tone: toneId });
  };

  const updateCharacters = (characters: any[]) => {
    updateStoryData({ characters });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        Story Settings
      </h2>

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
      
      <GenreSelector 
        selectedGenre={storyData.genre} 
        onSelectGenre={handleGenreSelect} 
      />
      
      <ToneSelector 
        selectedTone={storyData.tone} 
        onSelectTone={handleToneSelect} 
      />
      
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
      
      <CharacterManager 
        characters={storyData.characters} 
        updateCharacters={updateCharacters} 
      />
      
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
