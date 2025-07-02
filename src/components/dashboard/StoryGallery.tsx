
import StoryCard from "./StoryCard";
import { BookOpen } from "lucide-react";

interface Story {
  id: number;
  title: string;
  coverUrl: string;
  createdAt: string;
  is_favourite: boolean;
}

interface StoryGalleryProps {
  stories: Story[];
  isLoading: boolean;
  showFavourites?: boolean;
  onStoryClick: (id: number) => void;
  onFavourite: (id: number, isFav: boolean) => void;
  onDelete: (id: number) => void;
}

const StoryGallery = ({
  stories,
  isLoading,
  showFavourites = false,
  onStoryClick,
  onFavourite,
  onDelete
}: StoryGalleryProps) => {
  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground py-8 md:py-12 text-sm md:text-base">
        Loading your stories...
      </div>
    );
  }
  if (showFavourites && stories.length === 0) return null;
  return (
    <div>
      {showFavourites ? (
        <div className="mb-6 md:mb-9">
          <h3 className="text-lg md:text-xl font-semibold text-amber-600 mb-2 md:mb-3 px-1">
            ★ Favourite Stories
          </h3>
        </div>
      ) : (
        <div className="mb-6 md:mb-9">
          <h3 className="text-lg md:text-xl font-semibold text-story-blue mb-2 md:mb-3 flex items-center gap-2 px-1">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-story-blue" aria-hidden="true" />
            Recent Stories
          </h3>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 px-1">
        {stories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            isFavourite={showFavourites}
            onClick={() => onStoryClick(story.id)}
            onFavourite={() => onFavourite(story.id, showFavourites)}
            onDelete={() => onDelete(story.id)}
          />
        ))}
      </div>
      {showFavourites && <hr className="my-5 md:my-7 border-gray-300" />}
    </div>
  );
};

export default StoryGallery;
