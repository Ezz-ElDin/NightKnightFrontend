
import React from "react";
import { TONES } from "./constants";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (toneId: string) => void;
}

const TONE_CARDS = [
  {
    id: "playful",
    emoji: "😂🐒",
    color: "from-yellow-100 to-green-100",
  },
  {
    id: "calm",
    emoji: "😌🌙",
    color: "from-pink-200 to-violet-200",
  },
  {
    id: "exciting",
    emoji: "🎉🚀",
    color: "from-blue-100 to-sky-100",
  },
  {
    id: "kind",
    emoji: "💖🤲",
    color: "from-orange-100 to-pink-100",
  },
  {
    id: "inspirational",
    emoji: "🌟✨",
    color: "from-yellow-100 to-pink-100",
  },
  {
    id: "educational",
    emoji: "📚🧠",
    color: "from-sky-200 to-blue-200",
  },
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelectTone }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
        {TONE_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectTone(card.id)}
            className={`rounded-2xl border-2 shadow-lg px-8 py-7 flex flex-col items-center justify-center gap-2 text-center transition-transform hover:scale-105 focus:scale-105 bg-gradient-to-br ${card.color} 
              ${selectedTone === card.id ? "ring-4 ring-violet-400 scale-105 border-primary" : "border-transparent"}`}
            aria-pressed={selectedTone === card.id}
          >
            <span className="text-4xl">{card.emoji}</span>
            <span className="font-bold text-lg">
              {TONES.find((t) => t.id === card.id)?.name || card.id}
            </span>
            <span className="text-sm text-muted-foreground">
              {TONES.find((t) => t.id === card.id)?.description || ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
