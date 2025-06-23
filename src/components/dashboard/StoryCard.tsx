
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Delete, Download } from "lucide-react";

// Helper to determine if string is in Arabic for RTL
const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

interface StoryCardProps {
  story: {
    id: number;
    title: string;
    coverUrl: string;
    createdAt: string;
  };
  isFavourite?: boolean;
  onClick?: () => void;
  onFavourite?: () => void;
  onDelete?: () => void;
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

import { storiesApi, StoryDetails } from "@/lib/api";
import { exportStoryToPDF } from "@/lib/exportStoryToPDF";
import { useQuery } from "@tanstack/react-query";

const StoryCard: React.FC<StoryCardProps> = ({ story, isFavourite, onClick, onFavourite, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  // Fetch the full story details for export (only on demand)
  const { data: storyDetails, refetch: refetchDetails } = useQuery<StoryDetails>(
    {
      queryKey: ["story-export", story.id],
      queryFn: () => storiesApi.get(story.id),
      enabled: false,
    }
  );

  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };
  const handleMenuClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
  };

  const handleExportPDF = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    setLoadingPDF(true);
    // Refetch in case not loaded
    let details = storyDetails;
    if (!details) {
      const { data } = await refetchDetails();
      details = data;
    }
    if (details) {
      await exportStoryToPDF(details);
    }
    setLoadingPDF(false);
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
            type="button"
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
              className="absolute right-0 mt-2 w-44 bg-[#f4f0fc] border border-story-seafoam/40 rounded-2xl shadow-lg z-30 animate-in fade-in py-2"
              style={{ backgroundColor: "#f4f0fc" }}
              onClick={handleMenuClose}
            >
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    className={
                      "w-full px-5 py-3 flex items-center gap-3 font-medium text-base rounded-xl transition focus:outline-none " +
                      (isFavourite
                        ? "text-amber-600"
                        : "text-story-purple")
                    }
                    tabIndex={0}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavourite?.();
                      setMenuOpen(false);
                    }}
                  >
                    <Heart size={20} strokeWidth={2} fill={isFavourite ? "#f59e42" : "none"} color={isFavourite ? "#f59e42" : "#a093f4"} />
                    <span className="mt-0.5">{isFavourite ? "Favourited" : "Favourite"}</span>
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-5 py-3 flex items-center gap-3 text-gray-400 font-semibold focus:outline-none text-base rounded-xl transition cursor-not-allowed"
                    tabIndex={0}
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    disabled={true}
                    style={{
                      color: "#9CA3AF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Download size={20} strokeWidth={2} />
                    <div className="flex items-center gap-2 mt-0.5">
                      <span>Export</span>
                      <Badge variant="outline" className="bg-story-yellow/20 text-story-orange border-story-orange text-xs px-1.5 py-0.5">
                        Coming Soon
                      </Badge>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-5 py-3 flex items-center gap-3 text-red-700 font-semibold focus:outline-none text-base rounded-xl transition"
                    tabIndex={0}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                      setMenuOpen(false);
                    }}
                  >
                    <Delete size={20} />
                    <span className="mt-0.5">Delete</span>
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
