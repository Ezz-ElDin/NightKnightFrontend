
import React from "react";
import { 
  BookOpen, 
  Sparkles, 
  Star, 
  BookText, 
  Map, 
  History, 
  SmilePlus, 
  Brain, 
  Heart, 
  Laugh, 
  PartyPopper,
  Castle,
  TreePine,
  PawPrint,
  Rocket,
  Home,
  Compass,
  Wand,
  Moon,
  Music,
  MessageSquare,
  Lightbulb,
  School,
  Book
} from "lucide-react";

export const getThemeIcon = (themeId: string) => {
  switch(themeId) {
    case "fantasy": return <Castle className="h-14 w-14" />;
    case "animals": return <PawPrint className="h-14 w-14" />;
    case "space": return <Rocket className="h-14 w-14" />;
    case "daily": return <Home className="h-14 w-14" />;
    case "exploration": return <Compass className="h-14 w-14" />;
    case "whimsical": return <Wand className="h-14 w-14" />;
    default: return <BookOpen className="h-14 w-14" />;
  }
};

// Adding the getGenreIcon function to match the one being imported in GenreSelector
export const getGenreIcon = (genreId: string) => {
  // This just redirects to the renamed function for backward compatibility
  return getThemeIcon(genreId);
};

export const getToneIcon = (toneId: string) => {
  switch(toneId) {
    case "playful": return <PartyPopper className="h-14 w-14" />;
    case "calm": return <Moon className="h-14 w-14" />;
    case "exciting": return <Star className="h-14 w-14" />;
    case "kind": return <Heart className="h-14 w-14" />;
    case "inspirational": return <Sparkles className="h-14 w-14" />;
    case "educational": return <School className="h-14 w-14" />;
    default: return <SmilePlus className="h-14 w-14" />;
  }
};

export const getNarrativeStyleIcon = (styleId: string) => {
  switch(styleId) {
    case "classic": return <Book className="h-14 w-14" />;
    case "rhyming": return <Music className="h-14 w-14" />;
    case "dialogue": return <MessageSquare className="h-14 w-14" />;
    case "simple": return <BookText className="h-14 w-14" />;
    case "dreamy": return <Lightbulb className="h-14 w-14" />;
    default: return <BookOpen className="h-14 w-14" />;
  }
};
