
import React from "react";

const AGE_OPTIONS = [
  { label: "3-5", display: "3-5 years" },
  { label: "6-8", display: "6-8 years" },
  { label: "9-12", display: "9-12 years" },
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
