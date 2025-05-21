
import React from "react";

interface TitleInputProps {
  value: string;
  onChange: (v: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-lg font-semibold text-primary mb-1">
      <span role="img" aria-label="book">📖</span>
      Story Title
    </label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={35}
      placeholder="Name your story (or leave blank for a surprise!)"
      className="w-full rounded-xl border-2 border-primary/10 text-base md:text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-primary focus:ring-2 focus:ring-primary font-ghibli"
      autoComplete="off"
      spellCheck={true}
      aria-label="Story Title"
    />
  </div>
);

export default TitleInput;
