
import StoryBackground from "@/components/StoryBackground";
import EmailVerificationBanners from "@/components/dashboard/EmailVerificationBanners";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";
import SuccessBanner from "@/components/SuccessBanner";
import GeneratingStoryBanner from "@/components/dashboard/GeneratingStoryBanner";
import LibraryHeader from "@/components/dashboard/LibraryHeader";
import StoryCreditSection from "@/components/dashboard/StoryCreditSection";
import LibraryContent from "@/components/dashboard/LibraryContent";
import { useLibrary } from "@/hooks/useLibrary";

const Library = () => {
  const {
    deleteDialog,
    setDeleteDialog,
    showSuccessBanner,
    showGeneratingBanner,
    generatingStoryId,
    storyCredits,
    shouldShowVerificationBanner,
    hasCredits,
    allFavouriteStories,
    pagedStories,
    totalPages,
    page,
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
    <StoryBackground>
      <div className="container max-w-6xl mx-auto px-3 md:px-4 z-10">
        <EmailVerificationBanners shouldShow={shouldShowVerificationBanner} />

        {showSuccessBanner && <SuccessBanner onClose={handleCloseBanner} />}

        {showGeneratingBanner && (
          <GeneratingStoryBanner onDismiss={handleDismissGeneratingBanner} />
        )}

        <LibraryHeader />

        <StoryCreditSection storyCredits={storyCredits} />

        <LibraryContent
          allFavouriteStories={allFavouriteStories}
          pagedStories={pagedStories}
          isLoading={isLoading}
          isError={isError}
          hasCredits={hasCredits}
          totalPages={totalPages}
          page={page}
          generatingStoryId={generatingStoryId}
          onStoryClick={handleStoryClick}
          onFavourite={toggleFavourite}
          onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
          goToPage={goToPage}
        />
      </div>
      
      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onCancel={() => setDeleteDialog({ open: false, storyId: null })}
        onConfirm={() => deleteDialog.storyId && handleDeleteStory(deleteDialog.storyId)}
      />
    </StoryBackground>
  );
};

export default Library;
