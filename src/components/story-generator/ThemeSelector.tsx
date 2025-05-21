
import React from "react";
import { THEMES } from "./constants";

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const THEME_CARDS = [
  {
    id: "fantasy",
    emoji: "🏰",
    color: "from-pink-200 to-violet-200",
  },
  {
    id: "animals",
    emoji: "🐾",
    color: "from-yellow-100 to-green-100",
  },
  {
    id: "exploration",
    emoji: "🌍",
    color: "from-blue-100 to-sky-100",
  },
  {
    id: "daily",
    emoji: "🏡",
    color: "from-orange-100 to-pink-100",
  },
  {
    id: "space",
    emoji: "🪐",
    color: "from-sky-200 to-blue-200",
  },
  {
    id: "whimsical",
    emoji: "🌈",
    color: "from-pink-100 to-yellow-200",
  },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onSelectTheme }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
        {THEME_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectTheme(card.id)}
            className={`rounded-2xl border-2 shadow-lg px-8 py-7 flex flex-col items-center justify-center gap-2 text-center transition-transform hover:scale-105 focus:scale-105 bg-gradient-to-br ${card.color} 
              ${selectedTheme === card.id ? "ring-4 ring-violet-400 scale-105 border-primary" : "border-transparent"}`}
            aria-pressed={selectedTheme === card.id}
          >
            <span className="text-4xl">{card.emoji}</span>
            <span className="font-bold text-lg">
              {THEMES.find((t) => t.id === card.id)?.name || card.id}
            </span>
            <span className="text-sm text-muted-foreground">
              {THEMES.find((t) => t.id === card.id)?.description || ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;

