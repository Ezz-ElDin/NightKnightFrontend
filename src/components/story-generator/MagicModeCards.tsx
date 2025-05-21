
import React from "react";

const MAGIC_CARDS = [
  {
    id: "magic-worlds",
    emoji: "🏰",
    title: "Magical Worlds",
    description: "Wander into enchanted forests, meet fairies, talking animals, and discover castles full of magic.",
    set: {
      genre: "fantasy",
      tone: "calm",
      narrativeStyle: "dreamy"
    }
  },
  {
    id: "animal-adventures",
    emoji: "🐾",
    title: "Animal Adventures",
    description: "Join furry, feathery, and finned friends on silly quests, jungle fun, or bathtime mischief!",
    set: {
      genre: "animals",
      tone: "playful",
      narrativeStyle: "rhyming"
    }
  },
  {
    id: "exploring-beyond",
    emoji: "🌍",
    title: "Exploring & Beyond",
    description: "Zoom through forests, oceans, cities — or fly to the stars with robots and aliens!",
    set: {
      genre: "exploration",
      tone: "exciting",
      narrativeStyle: "dialogue"
    }
  },
  {
    id: "real-life-moments",
    emoji: "🏡",
    title: "Real Life Moments",
    description: "Big feelings in little moments — like your first day of school or learning something new with your family.",
    set: {
      genre: "daily",
      tone: "educational",
      narrativeStyle: "simple"
    }
  }
];

const cardColors = [
  "from-pink-200 to-violet-200",
  "from-yellow-100 to-green-100",
  "from-blue-100 to-sky-100",
  "from-orange-100 to-pink-100"
];

interface MagicModeCardsProps {
  onSelect: (settings: { genre: string; tone: string; narrativeStyle: string }) => void;
  selected: string | null;
}

const MagicModeCards: React.FC<MagicModeCardsProps> = ({ onSelect, selected }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
    {MAGIC_CARDS.map((card, idx) => (
      <button
        key={card.id}
        type="button"
        onClick={() => onSelect(card.set)}
        className={`rounded-2xl border-2 shadow-lg px-8 py-7 flex flex-col items-center justify-center gap-3 text-center transition-transform hover:scale-105 focus:scale-105 bg-gradient-to-br ${cardColors[idx % 4]} 
        ${selected === card.id ? "ring-4 ring-violet-400 scale-105 border-primary" : "border-transparent"}`}
        aria-pressed={selected === card.id}
      >
        <span className="text-4xl">{card.emoji}</span>
        <span className="font-bold text-lg">{card.title}</span>
        <span className="text-sm text-muted-foreground">{card.description}</span>
      </button>
    ))}
  </div>
);

export default MagicModeCards;
export { MAGIC_CARDS };

