
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryBackground from "@/components/StoryBackground";
import StoryGallery from "@/components/dashboard/StoryGallery";
import PaginationNav from "@/components/dashboard/PaginationNav";
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

  // Segregation and pagination
  const allFavouriteStories = stories.filter((s) => s.is_favourite);
  const allNonFavouriteStories = stories.filter((s) => !s.is_favourite);
  
  // Calculate pagination
  const totalPages = Math.ceil(allNonFavouriteStories.length / STORIES_PER_PAGE);
  const startIndex = (page - 1) * STORIES_PER_PAGE;
  const endIndex = startIndex + STORIES_PER_PAGE;
  const pagedStories = allNonFavouriteStories.slice(startIndex, endIndex);
  
  // Debug logging
  console.log('Total non-favourite stories:', allNonFavouriteStories.length);
  console.log('Total pages:', totalPages);
  console.log('Current page:', page);
  console.log('Stories per page:', STORIES_PER_PAGE);
  
  const goToPage = (p: number) => {
    setPage(p);
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
          <StoryGallery
            stories={allFavouriteStories}
            isLoading={isLoading}
            showFavourites={true}
            onStoryClick={handleStoryClick}
            onFavourite={toggleFavourite}
            onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
          />
          
          {/* Gallery for non-favourites */}
          <StoryGallery
            stories={pagedStories}
            isLoading={isLoading}
            showFavourites={false}
            onStoryClick={handleStoryClick}
            onFavourite={toggleFavourite}
            onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
          />
          
          {/* Pagination for non-favourites */}
          <div className="pagination-debug">
            <p className="text-sm text-gray-600 mb-2">
              Debug: {allNonFavouriteStories.length} stories, {totalPages} pages, showing page {page}
            </p>
            {totalPages > 1 && (
              <PaginationNav 
                totalPages={totalPages} 
                page={page} 
                goToPage={goToPage} 
              />
            )}
          </div>
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
