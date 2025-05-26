
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryBackground from "@/components/StoryBackground";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import StoryCard from "@/components/dashboard/StoryCard";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storiesApi, Story } from "@/lib/api";

const EMAIL_VERIFIED_FLAG = "email_verified_success_banner_dismissed";
const EMAIL_DISMISS_INFO = "email_verify_info_banner_dismissed";

const STORIES_PER_PAGE = 6;

// Helper to get query param
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const Library = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [page, setPage] = useState(1);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: null | number }>({ open: false, storyId: null });

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQueryParams();

  // Determine if user used email/password login
  const loginMethod = localStorage.getItem('loginMethod');
  const shouldShowVerificationBanner = loginMethod === 'email';

  // ==== React Query: list stories ====
  const queryClient = useQueryClient();
  const {
    data: stories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['stories'],
    queryFn: storiesApi.list,
    refetchOnWindowFocus: false,
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

  // Email banners
  useEffect(() => {
    if (!shouldShowVerificationBanner) return;
    const verifiedInQuery = query.get("verified") === "1";
    const successDismissed = localStorage.getItem("email_verified_success_banner_dismissed") === "1";
    if (verifiedInQuery && !successDismissed) {
      setShowSuccess(true);
      const params = new URLSearchParams(location.search);
      params.delete("verified");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!shouldShowVerificationBanner) return;
    const infoDismissed = localStorage.getItem("email_verify_info_banner_dismissed") === "1";
    const successDismissed = localStorage.getItem("email_verified_success_banner_dismissed") === "1";
    if (!infoDismissed && !successDismissed) {
      setShowInfo(true);
    }
  }, [shouldShowVerificationBanner]);

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    localStorage.setItem("email_verified_success_banner_dismissed", "1");
    setShowInfo(false);
  };

  const handleDismissInfo = () => {
    setShowInfo(false);
    localStorage.setItem("email_verify_info_banner_dismissed", "1");
  };

  const handleStoryClick = (storyId: number) => {
    navigate(`/library/stories/${storyId}`);
  };

  // ==== Show both favourite and non-favourite stories ====
  const allFavouriteStories = stories?.filter((s) => s.is_favourite) ?? [];
  const allNonFavouriteStories = stories?.filter((s) => !s.is_favourite) ?? [];
  const totalPages = Math.ceil(allNonFavouriteStories.length / STORIES_PER_PAGE);
  const pagedStories = allNonFavouriteStories.slice(
    (page - 1) * STORIES_PER_PAGE,
    page * STORIES_PER_PAGE
  );
  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favourite: send appropriate API call
  const toggleFavourite = (id: number, isFav: boolean) => {
    favMutation.mutate({ id, isFav });
  };

  // Delete a story (after confirmation)
  const handleDeleteStory = (storyId: number) => {
    deleteMutation.mutate(storyId);
  };

  return (
    <StoryBackground>
      <div className="container max-w-6xl mx-auto px-2 z-10">
        {/* Email verification banners */}
        <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto mb-4">
          {shouldShowVerificationBanner && showSuccess && (
            <Alert variant="default" className="flex items-center justify-between bg-green-50 border-green-200 text-green-900 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-4">
                <Check className="h-6 w-6 text-green-600" />
                <div>
                  <AlertTitle className="font-semibold">Email Verified</AlertTitle>
                  <AlertDescription>
                    Your email address has been successfully verified.
                  </AlertDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleDismissSuccess} className="ml-2" aria-label="Dismiss success alert">
                ✕
              </Button>
            </Alert>
          )}
          {shouldShowVerificationBanner && showInfo && (
            <Alert variant="default" className="flex items-center justify-between bg-blue-50 border-blue-200 text-blue-900 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-4">
                <Info className="h-6 w-6 text-blue-600" />
                <div>
                  <AlertTitle className="font-semibold">Please Verify Your Email</AlertTitle>
                  <AlertDescription>
                    Please verify your email address. Check your inbox to complete registration.
                  </AlertDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleDismissInfo} className="ml-2" aria-label="Dismiss info alert">
                ✕
              </Button>
            </Alert>
          )}
        </div>

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

          {/* Loading & error states */}
          {isLoading && (
            <div className="text-center text-muted-foreground py-12">Loading your stories...</div>
          )}
          {isError && (
            <div className="text-center text-red-500 py-12">Failed to load your stories. Please try again.</div>
          )}

          {/* Both sections appear if there are favourites & non-favourites */}
          {allFavouriteStories.length > 0 && !isLoading && (
            <div className="mb-9">
              <h3 className="text-xl font-semibold text-amber-600 mb-3">
                ★ Favourite Stories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFavouriteStories.map(story => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    isFavourite={true}
                    onClick={() => handleStoryClick(story.id)}
                    onFavourite={() => toggleFavourite(story.id, true)}
                    onDelete={() => setDeleteDialog({ open: true, storyId: story.id })}
                  />
                ))}
              </div>
              <hr className="my-7 border-gray-300" />
            </div>
          )}

          {/* Gallery for non-favourites */}
          {allNonFavouriteStories.length > 0 && !isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pagedStories.map(story => (
                <StoryCard
                  key={story.id}
                  story={story}
                  isFavourite={false}
                  onClick={() => handleStoryClick(story.id)}
                  onFavourite={() => toggleFavourite(story.id, false)}
                  onDelete={() => setDeleteDialog({ open: true, storyId: story.id })}
                />
              ))}
            </div>
          )}

          {/* Pagination for non-favourites */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToPage(Math.max(1, page - 1))}
                      className={page === 1 ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, idx) => (
                    <PaginationItem key={idx}>
                      <Button
                        size="sm"
                        variant={page === idx + 1 ? "default" : "outline"}
                        className="rounded-full w-10 h-10 flex items-center justify-center"
                        onClick={() => goToPage(idx + 1)}
                      >
                        {idx + 1}
                      </Button>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToPage(Math.min(totalPages, page + 1))}
                      className={page === totalPages ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Show message if there are no stories */}
          {!isLoading && stories && stories.length === 0 && (
            <div className="text-center text-muted-foreground py-12">You have no stories yet. Start by creating one!</div>
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
