import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Delete } from "lucide-react";

// Helper to determine if string is in Arabic for RTL
const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

interface StoryCardProps {
  story: {
    id: number;
    title: string;
    coverUrl: string;
    createdAt: string;
  };
  onClick?: () => void;
}

// Modern, visually appealing date + time, e.g. "May 26, 2024 · 11:30 PM"
const formatDate = (dateString: string) => {
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

const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // To avoid triggering card click when menu is clicked
  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };
  const handleMenuClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-story-seafoam/30 flex flex-col relative group hover:shadow-lg transition-shadow min-h-[305px] cursor-pointer"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View story: ${story.title}`}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { onClick?.(); } }}
    >
      <div className="relative">
        <img
          src={story.coverUrl}
          alt={story.title}
          className="w-full h-40 object-cover"
        />
        {/* Action menu button */}
        <div className="absolute top-2 right-2 z-20">
          <Button
            variant="ghost"
            className="rounded-full p-0 h-11 w-11 bg-[#FEF2C8] shadow-md flex items-center justify-center transition-none"
            style={{
              backgroundColor: "#FEF2C8",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            onClick={handleMenuButtonClick}
            aria-label="Story actions"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#48505A"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="6" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="18" r="1.5" />
            </svg>
          </Button>
          {/* Action dropdown menu */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-[#f4f0fc] border border-story-seafoam/40 rounded-xl shadow-lg z-30 animate-in fade-in"
              style={{ backgroundColor: "#f4f0fc" }}
              onClick={handleMenuClose}
            >
              <ul className="py-1">
                <li>
                  <button
                    className="w-full px-4 py-2 flex items-center gap-2 text-story-purple font-medium focus:outline-none"
                    tabIndex={0}
                  >
                    <Heart size={18} /> Favourite
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-4 py-2 flex items-center gap-2 text-red-700 font-medium focus:outline-none"
                    tabIndex={0}
                  >
                    <Delete size={18} /> Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className={
            "font-bold text-lg line-clamp-2 mb-2 " +
            (isArabic(story.title) ? "rtl text-right font-ghibli" : "")
          }
          dir={isArabic(story.title) ? "rtl" : "ltr"}
        >
          {story.title}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#eeeaf7] text-story-purple/80 shadow-sm">
            {formatDate(story.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
