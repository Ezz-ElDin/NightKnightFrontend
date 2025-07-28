
import { useState } from "react";
import { Heart, Globe, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StoryCardProps } from "./types";
import StoryCardImage from "./StoryCardImage";
import StoryCardContent from "./StoryCardContent";

// Helper function to beautify language values
const beautifyLanguage = (language: string): string => {
  switch (language) {
    case "egyptian_arabic":
      return "Arabic";
    case "british_english":
      return "English";
    default:
      return language;
  }
};

// Helper function to beautify theme values
const beautifyTheme = (theme: string): string => {
  switch (theme) {
    case "animal adventures":
      return "Animal Adventures";
    case "space and science fiction":
      return "Space & Science Fiction";
    case "daily life and routine":
      return "Daily Life & Routine";
    case "fantasy worlds":
      return "Fantasy Worlds";
    default:
      return theme;
  }
};

const StoryCard: React.FC<StoryCardProps> = ({ story, isFavourite, onClick, onFavourite, onDelete }) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavourite?.();
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
      <StoryCardImage
        coverUrl={story.coverUrl}
        title={story.title}
      />
      
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className={
            "font-bold text-lg line-clamp-2 mb-2 " +
            (story.title && /[\u0600-\u06FF]/.test(story.title) ? "rtl text-right font-ghibli" : "")
          }
          dir={story.title && /[\u0600-\u06FF]/.test(story.title) ? "rtl" : "ltr"}
        >
          {story.title}
        </h3>
        
        {/* Language and Theme tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {story.language && (
            <Badge variant="outline" className="bg-story-blue/10 text-story-blue border-story-blue/20 text-xs flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {beautifyLanguage(story.language)}
            </Badge>
          )}
          {story.theme && (
            <Badge variant="outline" className="bg-story-purple/10 text-story-purple border-story-purple/20 text-xs flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {beautifyTheme(story.theme)}
            </Badge>
          )}
        </div>
        
        {/* Timestamp - smaller and at bottom */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#eeeaf7] text-story-purple/60 shadow-sm">
            {(() => {
              const date = new Date(story.createdAt);
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
              return (
                <>
                  <span className="font-medium">{date.toLocaleDateString(undefined, dateOptions)}</span>
                  <span className="mx-1 text-gray-400">·</span>
                  <span className="">{date.toLocaleTimeString(undefined, timeOptions)}</span>
                </>
              );
            })()}
          </span>
        </div>
      </div>

      {/* Heart icon positioned at bottom right */}
      <button
        className="absolute bottom-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        onClick={handleHeartClick}
        aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
        type="button"
      >
        <Heart
          className="w-5 h-5 transition-colors"
          fill={isFavourite ? "#d97706" : "transparent"}
          stroke={isFavourite ? "#d97706" : "#6b7280"}
        />
      </button>
    </div>
  );
};

export default StoryCard;
