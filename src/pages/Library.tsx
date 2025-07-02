import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StoryBackground from "@/components/StoryBackground";
import StoryGallery from "@/components/dashboard/StoryGallery";
import PaginationNav from "@/components/dashboard/PaginationNav";
import EmailVerificationBanners from "@/components/dashboard/EmailVerificationBanners";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";
import SuccessBanner from "@/components/SuccessBanner";
import StoryGenerationBanner from "@/components/dashboard/StoryGenerationBanner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storiesApi, creditApi, Story } from "@/lib/api";

const STORIES_PER_PAGE = 6;

const Library = () => {
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: null | number }>({ open: false, storyId: null });
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [storyGenerationResult, setStoryGenerationResult] = useState<{
    status: 'success' | 'failed';
    storyId: string;
  } | null>(null);
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      console.log('Payment successful with session_id:', sessionId);
      setShowSuccessBanner(true);
      
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('session_id');
      setSearchParams(newSearchParams, { replace: true });
      
      queryClient.invalidateQueries({ queryKey: ['credits'] });
    }

    // Check for story generation result
    const generationResult = localStorage.getItem('storyGenerationResult');
    if (generationResult) {
      try {
        const result = JSON.parse(generationResult);
        // Show banner only if the result is recent (within 5 minutes)
        if (Date.now() - result.timestamp < 5 * 60 * 1000) {
          setStoryGenerationResult({
            status: result.status,
            storyId: result.storyId
          });
        }
        localStorage.removeItem('storyGenerationResult');
      } catch (error) {
        console.error('Error parsing story generation result:', error);
        localStorage.removeItem('storyGenerationResult');
      }
    }
  }, [searchParams, setSearchParams]);

  const loginMethod = localStorage.getItem('loginMethod');
  const shouldShowVerificationBanner = loginMethod === 'email';

  const { data: creditData } = useQuery({
    queryKey: ['credits'],
    queryFn: creditApi.get,
    refetchOnWindowFocus: false,
  });

  const storyCredits = creditData?.data?.remaining_credit || 0;

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

  const stories = allStories.filter((story: Story & { status?: string }) => {
    // Only show completed stories in the library
    return !story.status || story.status === 'completed';
  });

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

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await storiesApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setDeleteDialog({ open: false, storyId: null });
    },
  });

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

  const handleCloseGenerationBanner = () => {
    setStoryGenerationResult(null);
  };

  const hasCredits = storyCredits > 0;

  return (
    <StoryBackground>
      <div className="container max-w-6xl mx-auto px-3 md:px-4 z-10">
        <EmailVerificationBanners shouldShow={shouldShowVerificationBanner} />

        {showSuccessBanner && <SuccessBanner onClose={handleCloseBanner} />}
        
        {storyGenerationResult && (
          <StoryGenerationBanner
            status={storyGenerationResult.status}
            storyId={storyGenerationResult.storyId}
            onClose={handleCloseGenerationBanner}
          />
        )}

        {/* Mobile-optimized header */}
        <div className="mb-6 md:mb-8 mt-4 md:mt-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-story-purple text-center px-2">
            Welcome to NightKnight!
          </h1>
          <p className="text-sm md:text-lg mb-6 md:mb-9 text-center text-primary/90 max-w-2xl mx-auto px-4">
            Where imagination takes flight. Discover, create, and share magical stories with your loved ones!
          </p>
        </div>

        {/* Mobile-optimized Story Credits Section */}
        <Card className="mb-6 md:mb-8 p-3 md:p-4 bg-gradient-to-r from-story-lightPurple/20 to-story-seafoam/20 border border-story-lightPurple/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-story-purple mb-1">Story Credits</h3>
              <p className="text-xs md:text-sm text-gray-600">
                <span className="font-bold text-story-purple text-sm md:text-base">{storyCredits}</span> credits remaining
              </p>
            </div>
            <Link to="/account-settings?tab=credits" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-story-purple hover:bg-story-purple/90 text-white gap-2 px-3 md:px-4 py-2 rounded-full text-sm">
                <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
                Buy Credits
              </Button>
            </Link>
          </div>
        </Card>

        {/* Mobile-optimized Stories Section */}
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
            onStoryClick={handleStoryClick}
            onFavourite={toggleFavourite}
            onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
          />
          
          <StoryGallery
            stories={pagedStories}
            isLoading={isLoading}
            showFavourites={false}
            onStoryClick={handleStoryClick}
            onFavourite={toggleFavourite}
            onDelete={(id) => setDeleteDialog({ open: true, storyId: id })}
          />
          
          <PaginationNav totalPages={totalPages} page={page} goToPage={goToPage} />
        </div>
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
