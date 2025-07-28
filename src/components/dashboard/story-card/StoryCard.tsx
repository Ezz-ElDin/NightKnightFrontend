
import { useState } from "react";
import { Heart, Globe, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

      {/* Tags section */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        {story.language && (
          <Badge variant="outline" className="bg-story-blue/10 text-story-blue border-story-blue/20 text-xs flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {story.language}
          </Badge>
        )}
        {story.theme && (
          <Badge variant="outline" className="bg-story-purple/10 text-story-purple border-story-purple/20 text-xs flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {story.theme}
          </Badge>
        )}
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
