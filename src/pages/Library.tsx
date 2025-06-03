
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryBackground from "@/components/StoryBackground";
import StoryGallery from "@/components/dashboard/StoryGallery";
import EmailVerificationBanners from "@/components/dashboard/EmailVerificationBanners";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storiesApi, Story } from "@/lib/api";

const STORIES_PER_PAGE = 6;

const Library = () => {
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: null | number }>({ open: false, storyId: null });

  const navigate = useNavigate();

  // Determine if user used email/password login
  const loginMethod = localStorage.getItem('loginMethod');
  const shouldShowVerificationBanner = loginMethod === 'email';

  // ==== React Query: list stories ====
  const queryClient = useQueryClient();
  const {
    data: allStories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stories'],
    queryFn: storiesApi.list,
    refetchOnWindowFocus: false,
  });

  // Filter stories to only show completed ones
  const stories = allStories.filter((story: Story & { status?: string }) => {
    // If status is not provided, assume it's completed (backward compatibility)
    return !story.status || story.status === 'completed';
  });

  // ==== React Query: toggle favourite ====
  const favMutation = useMutation({
    mutationFn: async (input: { id: number; isFav: boolean }) => {
      if (input.isFav) {
        await storiesApi.unfavourite(input.id);
      } else {
        await storiesApi.favourite(input.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });

  // ==== React Query: delete story ====
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await storiesApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setDeleteDialog({ open: false, storyId: null });
    },
  });

  // Simple pagination logic
  const totalStories = stories.length;
  const totalPages = Math.ceil(totalStories / STORIES_PER_PAGE);
  const startIndex = (page - 1) * STORIES_PER_PAGE;
  const endIndex = startIndex + STORIES_PER_PAGE;
  
  // Get stories for current page
  const currentPageStories = stories.slice(startIndex, endIndex);
  
  // Separate into favourites and non-favourites for current page
  const favouriteStories = currentPageStories.filter((s) => s.is_favourite);
  const nonFavouriteStories = currentPageStories.filter((s) => !s.is_favourite);
  
  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers
  const toggleFavourite = (id: number, isFav: boolean) => {
    favMutation.mutate({ id, isFav });
  };
  const handleDeleteStory = (storyId: number) => {
    deleteMutation.mutate(storyId);
  };
  const handleStoryClick = (storyId: number) => {
    navigate(`/library/stories/${storyId}`);
  };

  return (
    <StoryBackground>
      <div className="container max-w-6xl mx-auto px-2 z-10">
        {/* Email verification banners */}
        <EmailVerificationBanners shouldShow={shouldShowVerificationBanner} />

        <div className="mb-8 mt-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-story-purple text-center">
            Welcome to NightKnight!
          </h1>
          <p className="text-lg mb-9 text-center text-primary/90 max-w-2xl mx-auto">
            Where imagination takes flight. Discover, create, and share magical stories with your loved ones!
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-story-blue">My Stories</h2>
            <Link to="/create-story">
              <Button className="rounded-xl px-6 py-3 text-md bg-story-purple hover:bg-story-purple/90 text-white flex items-center gap-2 button-bounce">
                <Star className="mr-1 h-5 w-5" />
                <span>Create a Story</span>
              </Button>
            </Link>
          </div>
          
          {/* Error state */}
          {isError && (
            <div className="text-center text-red-500 py-12">Failed to load your stories. Please try again.</div>
          )}
          
          {/* Favourite stories section */}
          {favouriteStories.length > 0 && (
            <StoryGallery
              stories={favouriteStories}
              isLoading={isLoading}
              showFavourites={true}
              onStoryClick={handleStoryClick}
              onFavourite={toggleFavourite}
              onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
            />
          )}
          
          {/* Non-favourite stories section */}
          {nonFavouriteStories.length > 0 && (
            <StoryGallery
              stories={nonFavouriteStories}
              isLoading={isLoading}
              showFavourites={false}
              onStoryClick={handleStoryClick}
              onFavourite={toggleFavourite}
              onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
            />
          )}
          
          {/* Simple pagination - show when total stories > 6 */}
          {totalStories > 6 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* Previous button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex items-center gap-1"
              >
                Previous
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button
                      key={pageNumber}
                      size="sm"
                      variant={page === pageNumber ? "default" : "outline"}
                      className="w-10 h-10"
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              {/* Next button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onCancel={() => setDeleteDialog({ open: false, storyId: null })}
        onConfirm={() => deleteDialog.storyId && handleDeleteStory(deleteDialog.storyId)}
      />
    </StoryBackground>
  );
};

export default Library;
