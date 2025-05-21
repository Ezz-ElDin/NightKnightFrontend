
import React from "react";
import { X } from "lucide-react";
import { CookingPot } from "lucide-react"; // Import witch cauldron icon

export interface CauldronIngredient {
  icon: string; // Emoji or icon
  label: string;
  type: "vibe" | "theme" | "tone" | "style" | "character";
  id: string;
}

interface CauldronPanelProps {
  ingredients: CauldronIngredient[];
  stirring: boolean;
  onClear: () => void;
  cauldronLabel?: string;
  onAnimationEnd?: () => void; // Reset stirring after animation
}

const CauldronPanel: React.FC<CauldronPanelProps> = ({
  ingredients,
  stirring,
  onClear,
  cauldronLabel = "Your story is taking shape…",
  onAnimationEnd,
}) => {
  // Ingredient list transitions in with fade
  return (
    <div className="flex flex-col h-full px-2 md:px-4 py-4 items-center justify-between bg-gradient-to-b from-purple-100 to-purple-200 rounded-3xl shadow-xl border-2 border-primary/10 min-h-[450px]">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="font-semibold text-xl text-center w-full">{cauldronLabel}</span>
        <button
          aria-label="Clear Cauldron"
          className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
          onClick={onClear}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 justify-center min-h-[280px]">
        {/* Cauldron Image & Animation */}
        <div className="relative flex flex-col items-center">
          {/* Witch Cauldron image */}
          <div
            className={`w-36 h-36 md:w-48 md:h-48 bg-gradient-to-t from-purple-700 to-purple-300 rounded-full shadow-lg flex items-center justify-center transition-transform ${
              stirring ? "animate-cauldron-stir" : ""
            }`}
            onAnimationEnd={onAnimationEnd}
            style={{
              border: "7px solid #38205c",
              marginBottom: "0.5rem",
              position: "relative",
            }}
          >
            <CookingPot 
              size={104}
              color="#343036"
              strokeWidth={2.5}
              className="drop-shadow-2xl w-24 h-24 md:w-28 md:h-28"
              aria-label="Witch Cauldron"
            />
            {/* Simulated surface bubbles */}
            <span
              className="absolute left-10 top-9 md:left-14 md:top-14 text-green-300 text-2xl animate-pulse pointer-events-none"
              style={{ filter: "blur(0.5px)" }}
              aria-hidden="true"
            >
              •
            </span>
            <span
              className="absolute left-16 top-7 md:left-20 md:top-12 text-green-200 text-lg animate-pulse pointer-events-none"
              aria-hidden="true"
            >
              •
            </span>
            {/* Add more bubbles if desired */}
          </div>
        </div>
        <div className="w-full text-center text-muted-foreground mt-1 text-sm">{ingredients.length === 0 ? "Nothing added yet!" : ""}</div>
      </div>

      <div className="w-full p-2 mt-3 space-y-1">
        <div className="font-semibold text-center mb-2">In your story cauldron:</div>
        <ul className="space-y-1">
          {ingredients.length === 0 && (
            <li className="text-muted-foreground text-center text-sm">— Add an ingredient to begin —</li>
          )}
          {ingredients.map((item, idx) => (
            <li
              key={item.id + item.type + idx}
              className="flex items-center justify-center gap-2 py-1 rounded-lg bg-white/70 shadow-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>
        {`
          @keyframes cauldron-stir {
            0% { transform: rotate(0deg) }
            20% { transform: rotate(-6deg) }
            50% { transform: rotate(9deg) }
            80% { transform: rotate(-4deg) }
            100% { transform: rotate(0deg) }
          }
          .animate-cauldron-stir {
            animation: cauldron-stir 0.95s cubic-bezier(0.53,0.18,0.57,1.04);
          }
        `}
      </style>
    </div>
  );
};

export default CauldronPanel;
