
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
    <div className="flex gap-4 mt-2 flex-wrap md:flex-nowrap">
      <button
        type="button"
        onClick={() => setMode("magic")}
        className={`flex-1 min-w-[220px] max-w-[420px] w-full aspect-[4/2] px-8 py-6 rounded-2xl text-lg md:text-xl font-bold border-2 transition-all duration-300 flex items-center justify-center relative shadow-sm
          ${mode === "magic"
            ? "bg-orange-400/90 text-white border-orange-400 shadow-lg scale-105 ring-4 ring-pink-200"
            : "bg-orange-300/10 text-orange-800 border-orange-300/30 hover:bg-orange-200/40"}
        `}
        tabIndex={0}
        style={{ alignItems: "center" }}
      >
        <div className="flex flex-col items-center w-full">
          <span className="text-xl mb-2">Magic</span>
          <span className="block text-xs font-normal mt-auto text-orange-900/90 text-center">
            The fairy will create the story for you.
          </span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => setMode("creative")}
        className={`flex-1 min-w-[220px] max-w-[420px] w-full aspect-[4/2] px-8 py-6 rounded-2xl text-lg md:text-xl font-bold border-2 transition-all duration-300 flex items-center justify-center relative shadow-sm
          ${mode === "creative"
            ? "bg-purple-400/90 text-white border-purple-400 shadow-lg scale-105 ring-4 ring-purple-200"
            : "bg-purple-300/10 text-purple-800 border-purple-300/30 hover:bg-purple-200/40"}
        `}
        tabIndex={0}
        style={{ alignItems: "center" }}
      >
        <div className="flex flex-col items-center w-full">
          <span className="text-xl mb-2">Creative</span>
          <span className="block text-xs font-normal mt-auto text-purple-900/90 text-center">
            You’re the one making the magic.
          </span>
        </div>
      </button>
    </div>
  </div>
);

export default ModeSelector;

