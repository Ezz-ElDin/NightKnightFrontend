
import { useState } from "react";
import { Heart } from "lucide-react";
import { StoryCardProps } from "./types";
import StoryCardImage from "./StoryCardImage";
import StoryCardContent from "./StoryCardContent";

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
      
      <StoryCardContent
        title={story.title}
        createdAt={story.createdAt}
      />

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
