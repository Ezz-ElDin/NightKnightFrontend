
import React from "react";

interface ModeSelectorProps {
  mode: "magic" | "creative";
  setMode: (mode: "magic" | "creative") => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => (
  <div>
    <label className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
      <span role="img" aria-label="magic">🪄</span>
      Choose Mode
    </label>
    <div className="flex gap-3 mt-1">
      <button
        type="button"
        onClick={() => setMode("magic")}
        className={`flex-1 py-3 rounded-xl text-base md:text-lg font-bold border-2 h-20 transition-all duration-300 flex flex-col items-center justify-center relative
          ${mode === "magic"
            ? "bg-orange-400/90 text-white border-orange-400 shadow-lg scale-105 ring-4 ring-pink-200"
            : "bg-orange-300/10 text-orange-800 border-orange-300/30 hover:bg-orange-200/40"}
        `}
        tabIndex={0}
      >
        Magic
        <span className="block text-xs font-normal mt-1 text-orange-900/90">
          The fairy will create the story for you.
        </span>
      </button>
      <div className="relative flex-1 h-20">
        <button
          type="button"
          onClick={() => setMode("creative")}
          className={`w-full h-full rounded-xl text-base md:text-lg font-bold border-2 transition-all duration-300 flex flex-col items-center justify-center relative
            ${mode === "creative"
              ? "bg-purple-400/90 text-white border-purple-400 shadow-lg scale-105 ring-4 ring-purple-200"
              : "bg-purple-300/10 text-purple-800 border-purple-300/30 hover:bg-purple-200/40"}
          `}
          tabIndex={0}
        >
          Creative
          <span className="block text-xs font-normal mt-1 text-purple-900/90">
            You’re the one making the magic.
          </span>
        </button>
      </div>
    </div>
  </div>
);

export default ModeSelector;
