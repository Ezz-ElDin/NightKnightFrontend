
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StoryGallery from "./StoryGallery";
import StoryCard from "./StoryCard";
import PaginationNav from "./PaginationNav";
import GeneratingStoryCard from "./story-card/GeneratingStoryCard";
import { Story } from "@/lib/api";

interface LibraryContentProps {
  allFavouriteStories: Story[];
  pagedStories: Story[];
  isLoading: boolean;
  isError: boolean;
  hasCredits: boolean;
  totalPages: number;
  page: number;
  generatingStoryId: string | null;
  onStoryClick: (id: number) => void;
  onFavourite: (id: number, isFav: boolean) => void;
  onDelete: (id: number) => void;
  goToPage: (p: number) => void;
}

const LibraryContent: React.FC<LibraryContentProps> = ({
  allFavouriteStories,
  pagedStories,
  isLoading,
  isError,
  hasCredits,
  totalPages,
  page,
  generatingStoryId,
  onStoryClick,
  onFavourite,
  onDelete,
  goToPage
}) => {
  const recentStoriesRef = useRef<HTMLDivElement>(null);
  const STORIES_PER_PAGE = 6;

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-5 gap-3 sm:gap-0">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-story-blue">My Stories</h2>
        <TooltipProvider delayDuration={0}>
          {hasCredits ? (
            <Link to="/create-story" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-xl px-4 md:px-6 py-2 md:py-3 text-sm md:text-md bg-story-purple hover:bg-story-purple/90 text-white flex items-center justify-center gap-2 button-bounce">
                <Star className="h-4 w-4 md:h-5 md:w-5" />
                <span>Create a Story</span>
              </Button>
            </Link>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block w-full sm:w-auto">
                  <Button 
                    disabled 
                    className="w-full sm:w-auto rounded-xl px-4 md:px-6 py-2 md:py-3 text-sm md:text-md bg-gray-300 text-gray-500 flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Star className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Create a Story</span>
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
                <p>You need to buy credits to create a story</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
      
      {isError && (
        <div className="text-center text-red-500 py-8 md:py-12 text-sm md:text-base">Failed to load your stories. Please try again.</div>
      )}
      
      <StoryGallery
        stories={allFavouriteStories}
        isLoading={isLoading}
        showFavourites={true}
        onStoryClick={onStoryClick}
        onFavourite={onFavourite}
        onDelete={onDelete}
      />
      
      <div ref={recentStoriesRef}>
        {/* Show generating story card at the top of recent stories if exists */}
        {generatingStoryId && (
          <div className="mb-6 md:mb-9">
            <h3 className="text-lg md:text-xl font-semibold text-story-blue mb-2 md:mb-3 flex items-center gap-2 px-1">
              Recent Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 px-1">
              <GeneratingStoryCard />
              {pagedStories.slice(0, STORIES_PER_PAGE - 1).map(story => (
                <StoryCard
                  key={story.id}
                  story={story}
                  isFavourite={false}
                  onClick={() => onStoryClick(story.id)}
                  onFavourite={() => onFavourite(story.id, false)}
                  onDelete={() => onDelete(story.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        {!generatingStoryId && (
          <StoryGallery
            stories={pagedStories}
            isLoading={isLoading}
            showFavourites={false}
            onStoryClick={onStoryClick}
            onFavourite={onFavourite}
            onDelete={onDelete}
          />
        )}
      </div>
      
      <PaginationNav totalPages={totalPages} page={page} goToPage={goToPage} />
    </div>
  );
};

export default LibraryContent;
