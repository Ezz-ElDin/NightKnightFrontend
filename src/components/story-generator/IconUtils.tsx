
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
  PartyPopper 
} from "lucide-react";

export const getGenreIcon = (genreId: string) => {
  switch(genreId) {
    case "adventure": return <Map className="h-14 w-14" />;
    case "fantasy": return <Sparkles className="h-14 w-14" />;
    case "mystery": return <BookText className="h-14 w-14" />;
    case "friendship": return <SmilePlus className="h-14 w-14" />;
    case "animals": return <span className="text-6xl">🐾</span>;
    case "magic": return <Sparkles className="h-14 w-14" />;
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
