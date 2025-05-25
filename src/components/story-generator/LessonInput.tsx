
import React from "react";

interface LessonInputProps {
  value: string;
  onChange: (v: string) => void;
}

const LessonInput: React.FC<LessonInputProps> = ({ value, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-lg font-semibold text-yellow-900 mb-1">
      <span role="img" aria-label="star">⭐</span>
      Story Lesson
    </label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={100}
      placeholder="What should kids learn? (kindness, bravery...)"
      className="w-full rounded-xl border-2 border-yellow-400/30 text-base md:text-lg bg-white px-5 py-3 mt-1 shadow-md focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300/40 font-ghibli"
      autoComplete="off"
      spellCheck={true}
      aria-label="Story Lesson"
    />
  </div>
);

export default LessonInput;
