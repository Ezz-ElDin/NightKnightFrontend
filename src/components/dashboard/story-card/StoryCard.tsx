
import { useState } from "react";
import { Heart } from "lucide-react";
import { StoryCardProps } from "./types";
import StoryCardImage from "./StoryCardImage";
import StoryCardContent from "./StoryCardContent";

const StoryCard: React.FC<StoryCardProps> = ({ story, isFavourite, onClick, onFavourite, onDelete }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
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
        onMenuToggle={() => {}} // Not needed anymore
      >
        {/* Heart icon positioned in top-right corner */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-20"
          onClick={handleFavoriteClick}
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            strokeWidth={2} 
            fill={isFavourite ? "#f59e42" : "none"} 
            color={isFavourite ? "#f59e42" : "#a093f4"} 
          />
        </button>
      </StoryCardImage>
      
      <StoryCardContent
        title={story.title}
        createdAt={story.createdAt}
      />
    </div>
  );
};

export default StoryCard;
