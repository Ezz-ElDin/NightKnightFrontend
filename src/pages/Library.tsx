import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StoryBackground from "@/components/StoryBackground";
import StoryGallery from "@/components/dashboard/StoryGallery";
import PaginationNav from "@/components/dashboard/PaginationNav";
import EmailVerificationBanners from "@/components/dashboard/EmailVerificationBanners";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";
import SuccessBanner from "@/components/SuccessBanner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storiesApi, creditApi, Story } from "@/lib/api";

const STORIES_PER_PAGE = 6;

const Library = () => {
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: null | number }>({ open: false, storyId: null });
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check for successful payment
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      console.log('Payment successful with session_id:', sessionId);
      setShowSuccessBanner(true);
      
      // Clean up the URL by removing the session_id parameter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('session_id');
      setSearchParams(newSearchParams, { replace: true });
      
      // Refetch credits to update the UI with new credit count
      queryClient.invalidateQueries({ queryKey: ['credits'] });
    }
  }, [searchParams, setSearchParams]);

  // Determine if user used email/password login
  const loginMethod = localStorage.getItem('loginMethod');
  const shouldShowVerificationBanner = loginMethod === 'email';

  // ==== React Query: fetch story credits ====
  const { data: creditData } = useQuery({
    queryKey: ['credits'],
    queryFn: creditApi.get,
    refetchOnWindowFocus: false,
  });

  const storyCredits = creditData?.data?.remaining_credit || 0;

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

  // Segregation
  const allFavouriteStories = stories.filter((s) => s.is_favourite);
  const allNonFavouriteStories = stories.filter((s) => !s.is_favourite);
  const totalPages = Math.ceil(allNonFavouriteStories.length / STORIES_PER_PAGE);
  const pagedStories = allNonFavouriteStories.slice(
    (page - 1) * STORIES_PER_PAGE,
    page * STORIES_PER_PAGE
  );
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

  const handleCloseBanner = () => {
    setShowSuccessBanner(false);
  };

  return (
    <StoryBackground>
      <div className="container max-w-6xl mx-auto px-2 z-10">
        {/* Email verification banners */}
        <EmailVerificationBanners shouldShow={shouldShowVerificationBanner} />

        {/* Success banner for payment */}
        {showSuccessBanner && <SuccessBanner onClose={handleCloseBanner} />}

        <div className="mb-8 mt-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-story-purple text-center">
            Welcome to NightKnight!
          </h1>
          <p className="text-lg mb-9 text-center text-primary/90 max-w-2xl mx-auto">
            Where imagination takes flight. Discover, create, and share magical stories with your loved ones!
          </p>
        </div>

        {/* Compact Story Credits Section */}
        <Card className="mb-8 p-4 bg-gradient-to-r from-story-lightPurple/20 to-story-seafoam/20 border border-story-lightPurple/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-story-purple mb-1">Story Credits</h3>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-story-purple text-lg">{storyCredits}</span> credits remaining
              </p>
            </div>
            <Link to="/account-settings?tab=credits">
              <Button className="bg-story-purple hover:bg-story-purple/90 text-white gap-2 px-4 py-2 rounded-lg text-sm">
                <CreditCard className="h-4 w-4" />
                Buy Credits
              </Button>
            </Link>
          </div>
        </Card>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-story-blue">My Stories</h2>
            <Link to="/create-story">
              <Button className="relative overflow-hidden bg-gradient-to-r from-story-purple to-story-lightPurple hover:from-story-lightPurple hover:to-story-purple text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-2xl px-8 py-4 text-lg border-2 border-story-purple/50">
                <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse"></div>
                <div className="relative flex items-center gap-3">
                  <Star className="h-6 w-6 text-white animate-wiggle" />
                  <span className="font-extrabold">✨ Create a Story ✨</span>
                </div>
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
          <PaginationNav totalPages={totalPages} page={page} goToPage={goToPage} />
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
