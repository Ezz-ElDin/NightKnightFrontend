
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
  Wand
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

export const getToneIcon = (toneId: string) => {
  switch(toneId) {
    case "friendly": return <Heart className="h-14 w-14" />;
    case "playful": return <PartyPopper className="h-14 w-14" />;
    case "educational": return <Brain className="h-14 w-14" />;
    case "inspirational": return <Star className="h-14 w-14" />;
    case "soothing": return <History className="h-14 w-14" />;
    case "silly": return <Laugh className="h-14 w-14" />;
    default: return <SmilePlus className="h-14 w-14" />;
  }
};
