
import React from "react";

// UPDATED: Hide 7-9 years option, only show 0-3 and 4-6
const AGE_OPTIONS = [
  { label: "0-3", display: "0-3 years" },
  { label: "4-6", display: "4-6 years" },
  // COMMENTED OUT: Hide 7-9 years option
  // { label: "7-9", display: "7-9 years" },
];

interface AgeRangeSelectorProps {
  ageRange: string;
  setAgeRange: (range: string) => void;
}

const AgeRangeSelector: React.FC<AgeRangeSelectorProps> = ({ ageRange, setAgeRange }) => (
  <div>
    <label className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
      <span role="img" aria-label="child">👧</span>
      Age Range
    </label>
    <div className="flex gap-3">
      {AGE_OPTIONS.map(option => (
        <button
          key={option.label}
          type="button"
          className={`flex-1 py-3 rounded-xl text-base font-bold transition-all border-2
            ${ageRange === option.label
              ? "bg-primary text-white border-primary shadow-lg"
              : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
            }`}
          style={{ minWidth: 0 }}
          onClick={() => setAgeRange(option.label)}
        >
          {option.display}
        </button>
      ))}
    </div>
  </div>
);

export default AgeRangeSelector;
