
import React from "react";
import { NARRATIVE_STYLES } from "./constants";

interface NarrativeStyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
}

const STYLE_CARDS = [
  {
    id: "classic",
    emoji: "📖🕰️",
    color: "from-yellow-100 to-green-100",
  },
  {
    id: "rhyming",
    emoji: "🎶🧑‍🎤",
    color: "from-pink-200 to-violet-200",
  },
  {
    id: "dialogue",
    emoji: "💬🎭",
    color: "from-blue-100 to-sky-100",
  },
  {
    id: "simple",
    emoji: "✏️🍎",
    color: "from-orange-100 to-pink-100",
  },
  {
    id: "dreamy",
    emoji: "☁️💫",
    color: "from-yellow-100 to-pink-100",
  },
];

const NarrativeStyleSelector: React.FC<NarrativeStyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
        {STYLE_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectStyle(card.id)}
            className={`rounded-2xl border-2 shadow-lg px-8 py-7 text-left flex flex-col gap-2 transition-transform hover:scale-105 focus:scale-105 bg-gradient-to-br ${card.color} 
              ${selectedStyle === card.id ? "ring-4 ring-violet-400 scale-105 border-primary" : "border-transparent"}`}
            aria-pressed={selectedStyle === card.id}
          >
            <span className="text-4xl">{card.emoji}</span>
            <span className="font-bold text-lg">
              {NARRATIVE_STYLES.find((s) => s.id === card.id)?.name || card.id}
            </span>
            <span className="text-sm text-muted-foreground">
              {NARRATIVE_STYLES.find((s) => s.id === card.id)?.description || ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NarrativeStyleSelector;
