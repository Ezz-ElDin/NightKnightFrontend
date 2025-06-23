
import React from 'react';

// Helper to determine if string is in Arabic for RTL
export const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

// Modern, visually appealing date + time, e.g. "May 26, 2024 · 11:30 PM"
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  // Use more visually separated style
  return (
    <span>
      <span className="font-semibold">{date.toLocaleDateString(undefined, dateOptions)}</span>
      <span className="mx-1 text-gray-400">·</span>
      <span className="">{date.toLocaleTimeString(undefined, timeOptions)}</span>
    </span>
  );
};
