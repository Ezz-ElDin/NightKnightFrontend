import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryBackground from "@/components/StoryBackground";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import StoryCard from "@/components/dashboard/StoryCard";
import ConfirmDeleteDialog from "@/components/dashboard/ConfirmDeleteDialog";

const EMAIL_VERIFIED_FLAG = "email_verified_success_banner_dismissed";
const EMAIL_DISMISS_INFO = "email_verify_info_banner_dismissed";

const MOCK_STORIES = [
  {
    id: 1,
    title: "القطة الشجاعة والقمر", // Arabic for demonstration
    coverUrl: "/images/moon-kittens.png",
    createdAt: "2024-05-24T22:00:00Z",
  },
  {
    id: 2,
    title: "The Lost Pirate Hat",
    coverUrl: "/images/dragon-treasure.png",
    createdAt: "2024-05-23T20:03:00Z",
  },
  {
    id: 3,
    title: "The Magical Treehouse",
    coverUrl: "/images/space-journey.png",
    createdAt: "2024-05-22T16:54:00Z",
  },
  {
    id: 4,
    title: "Dancing with Stars",
    coverUrl: "/images/storybook_illustration.png",
    createdAt: "2024-05-21T12:20:00Z",
  },
  {
    id: 5,
    title: "Pirate Cats Go Home",
    coverUrl: "/images/paper_cutout_illustration.png",
    createdAt: "2024-05-20T09:11:00Z",
  },
  {
    id: 6,
    title: "The Colorful Parade",
    coverUrl: "/images/cinematic_illustration.png",
    createdAt: "2024-05-19T13:50:00Z",
  },
  {
    id: 7,
    title: "The Rainbow Cave",
    coverUrl: "/images/dragon-treasure.png",
    createdAt: "2024-05-18T16:02:00Z",
  },
  {
    id: 8,
    title: "The Space Picnic",
    coverUrl: "/images/space-journey.png",
    createdAt: "2024-05-17T10:45:00Z",
  },
  {
    id: 9,
    title: "Amazing Cloud Riders",
    coverUrl: "/images/moon-kittens.png",
    createdAt: "2024-05-16T19:38:00Z",
  },
  {
    id: 10,
    title: "The Whispering Forest",
    coverUrl: "/images/storybook_illustration.png",
    createdAt: "2024-05-15T15:15:00Z",
  },
];

const STORIES_PER_PAGE = 6;

// Helper to get query param
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [page, setPage] = useState(1);

  // App logic for favourite stories
  const [stories, setStories] = useState(MOCK_STORIES);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: null | number }>({ open: false, storyId: null });

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  // Determine if user used email/password login
  const loginMethod = localStorage.getItem('loginMethod');
  const shouldShowVerificationBanner = loginMethod === 'email';

  useEffect(() => {
    if (!shouldShowVerificationBanner) return;
    const verifiedInQuery = query.get("verified") === "1";
    const successDismissed = localStorage.getItem(EMAIL_VERIFIED_FLAG) === "1";
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
    const infoDismissed = localStorage.getItem(EMAIL_DISMISS_INFO) === "1";
    const successDismissed = localStorage.getItem(EMAIL_VERIFIED_FLAG) === "1";
    if (!infoDismissed && !successDismissed) {
      setShowInfo(true);
    }
  }, [shouldShowVerificationBanner]);

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    localStorage.setItem(EMAIL_VERIFIED_FLAG, "1");
    setShowInfo(false);
  };

  const handleDismissInfo = () => {
    setShowInfo(false);
    localStorage.setItem(EMAIL_DISMISS_INFO, "1");
  };

  const handleStoryClick = (storyId: number) => {
    navigate(`/dashboard/stories/${storyId}`);
  };

  // Pagination logic (non-favourites)
  const allFavouriteStories = stories.filter((s) => favourites.includes(s.id));
  const allNonFavouriteStories = stories.filter((s) => !favourites.includes(s.id));
  const totalPages = Math.ceil(allNonFavouriteStories.length / STORIES_PER_PAGE);
  const pagedStories = allNonFavouriteStories.slice(
    (page - 1) * STORIES_PER_PAGE,
    page * STORIES_PER_PAGE
  );
  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add/Remove favourite
  const toggleFavourite = (id: number) => {
    setFavourites((prevFavs) =>
      prevFavs.includes(id)
        ? prevFavs.filter((fav) => fav !== id)
        : [id, ...prevFavs]
    );
  };

  // Delete a story (after confirmation)
  const handleDeleteStory = (storyId: number) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
    setFavourites((prevFavs) => prevFavs.filter((id) => id !== storyId));
    setDeleteDialog({ open: false, storyId: null });
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

          {/* Favourite stories section */}
          {allFavouriteStories.length > 0 && (
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
                    onFavourite={() => toggleFavourite(story.id)}
                    onDelete={() => setDeleteDialog({ open: true, storyId: story.id })}
                  />
                ))}
              </div>
              <hr className="my-7 border-gray-300" />
            </div>
          )}

          {/* Gallery for non-favourites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pagedStories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                isFavourite={false}
                onClick={() => handleStoryClick(story.id)}
                onFavourite={() => toggleFavourite(story.id)}
                onDelete={() => setDeleteDialog({ open: true, storyId: story.id })}
              />
            ))}
          </div>
          {/* Pagination for non-favourites */}
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

export default Dashboard;
