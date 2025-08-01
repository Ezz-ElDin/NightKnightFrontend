import React from "react";
import { useLibrary } from "@/hooks/useLibrary";
import LibraryContent from "@/components/dashboard/LibraryContent";
import DeleteStoryDialog from "@/components/dashboard/DeleteStoryDialog";
import SuccessBanner from "@/components/dashboard/SuccessBanner";
import GeneratingStoryBanner from "@/components/dashboard/GeneratingStoryBanner";

const Library = () => {
  const {
    deleteDialog,
    setDeleteDialog,
    showSuccessBanner,
    showGeneratingBanner,
    generatingStoryId,
    generatingStoryStatus,
    page,
    storyCredits,
    hasCredits,
    allFavouriteStories,
    pagedStories,
    totalPages,
    isLoading,
    isError,
    toggleFavourite,
    handleDeleteStory,
    handleStoryClick,
    handleCloseBanner,
    handleDismissGeneratingBanner,
    goToPage,
  } = useLibrary();

  return (
    <div className="container py-8 md:py-12">
      {showSuccessBanner && (
        <SuccessBanner onClose={handleCloseBanner} />
      )}
      {showGeneratingBanner && (
        <GeneratingStoryBanner onDismiss={handleDismissGeneratingBanner} />
      )}
      
      <LibraryContent
        allFavouriteStories={allFavouriteStories}
        pagedStories={pagedStories}
        isLoading={isLoading}
        isError={isError}
        hasCredits={hasCredits}
        totalPages={totalPages}
        page={page}
        generatingStoryId={generatingStoryId}
        generatingStoryStatus={generatingStoryStatus}
        onStoryClick={handleStoryClick}
        onFavourite={toggleFavourite}
        onDelete={(storyId) => setDeleteDialog({ open: true, storyId })}
        goToPage={goToPage}
      />

      <DeleteStoryDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, storyId: null })}
        onConfirm={() => handleDeleteStory(deleteDialog.storyId!)}
      />
    </div>
  );
};

export default Library;
