
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { storiesApi, StoryDetails } from "@/lib/api";
import { exportStoryToPDF } from "@/lib/exportStoryToPDF";
import { StoryCardProps } from "./types";
import StoryCardImage from "./StoryCardImage";
import StoryCardMenu from "./StoryCardMenu";
import StoryCardContent from "./StoryCardContent";

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
      <StoryCardImage
        coverUrl={story.coverUrl}
        title={story.title}
        onMenuToggle={handleMenuButtonClick}
      >
        <StoryCardMenu
          isOpen={menuOpen}
          onClose={handleMenuClose}
          isFavourite={isFavourite}
          onFavourite={onFavourite}
          onExportPDF={handleExportPDF}
          loadingPDF={loadingPDF}
        />
      </StoryCardImage>
      
      <StoryCardContent
        title={story.title}
        createdAt={story.createdAt}
      />
    </div>
  );
};

export default StoryCard;
