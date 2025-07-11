import { useState } from "react";
import StoryCard from "@/components/dashboard/StoryCard";
import DesktopDiscoverStoryViewer from "@/components/story-viewer/DesktopDiscoverStoryViewer";
import MobileDiscoverStoryViewer from "@/components/story-viewer/MobileDiscoverStoryViewer";
import { useDiscoverStoryViewer } from "@/hooks/useDiscoverStoryViewer";
import { transformStoryData } from "@/lib/storyDataTransformer";
import { jsonStoriesData } from "@/data/discoverStoriesData";

const DiscoverStories = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    page,
    setPage,
    numPages,
    currentPage,
    canPrev,
    canNext,
    isMobile,
  } = useDiscoverStoryViewer(selectedStory);

  // Transform the JSON data to the expected format
  const sampleStories = transformStoryData(jsonStoriesData);
  
  const handleStoryClick = (story: any) => {
    setSelectedStory(story);
    setIsDialogOpen(true);
    setPage(1); // Reset to page 1 (cover page)
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStory(null);
    setPage(1); // Reset to page 1
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-story-lightPurple/30 to-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-story-purple">
          Discover Magical Stories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleStories.map(story => (
            <div key={story.id} onClick={() => handleStoryClick(story)}>
              <DiscoverStoryCard story={story} />
            </div>
          ))}
        </div>

        {/* Conditional Story Viewer */}
        {isDialogOpen && selectedStory && (
          isMobile ? (
            <MobileDiscoverStoryViewer
              story={selectedStory}
              onClose={handleCloseDialog}
            />
          ) : (
            <DesktopDiscoverStoryViewer
              story={selectedStory}
              page={page}
              setPage={setPage}
              numPages={numPages}
              currentPage={currentPage}
              canPrev={canPrev}
              canNext={canNext}
              onClose={handleCloseDialog}
            />
          )
        )}
      </div>
    </section>
  );
};

const DiscoverStoryCard = ({ story }: { story: any }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-story-seafoam/30 flex flex-col relative group hover:shadow-lg transition-shadow min-h-[305px] cursor-pointer">
      <div className="h-48 bg-gradient-to-br from-story-lightPurple/20 to-story-peach/20 flex items-center justify-center overflow-hidden">
        {story.coverUrl ? (
          <img 
            src={story.coverUrl} 
            alt={story.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Error loading image: ${story.coverUrl}`);
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-story-lightPurple/40 to-story-peach/40 flex items-center justify-center">
            <span className="text-story-purple/60 text-sm">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-2 mb-3 text-story-purple">
          {story.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-story-blue/10 text-story-blue">
            {story.language}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-story-purple/10 text-story-purple">
            {story.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiscoverStories;
