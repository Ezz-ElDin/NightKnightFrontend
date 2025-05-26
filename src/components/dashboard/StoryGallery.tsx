
import StoryCard from "./StoryCard";

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
      <div className="text-center text-muted-foreground py-12">
        Loading your stories...
      </div>
    );
  }
  if (showFavourites && stories.length === 0) return null;
  return (
    <div>
      {showFavourites && (
        <div className="mb-9">
          <h3 className="text-xl font-semibold text-amber-600 mb-3">
            ★ Favourite Stories
          </h3>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      {showFavourites && <hr className="my-7 border-gray-300" />}
    </div>
  );
};

export default StoryGallery;
