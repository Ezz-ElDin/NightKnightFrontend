
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, Info, Moon, Star, Book, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryBackground from "@/components/StoryBackground";

// Helper to get query param
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EMAIL_VERIFIED_FLAG = "email_verified_success_banner_dismissed";
const EMAIL_DISMISS_INFO = "email_verify_info_banner_dismissed";

const Dashboard = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  // Determine if user used email/password login
  const loginMethod = localStorage.getItem('loginMethod');
  const shouldShowVerificationBanner = loginMethod === 'email';

  // Check for ?verified=1 in URL and show success banner just once
  useEffect(() => {
    if (!shouldShowVerificationBanner) return;

    const verifiedInQuery = query.get("verified") === "1";
    const successDismissed = localStorage.getItem(EMAIL_VERIFIED_FLAG) === "1";
    if (verifiedInQuery && !successDismissed) {
      setShowSuccess(true);
      // Remove ?verified=1 from the URL after showing
      const params = new URLSearchParams(location.search);
      params.delete("verified");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  // eslint-disable-next-line
  }, []); // On first render

  // Show info banner if not verified and not dismissed before, and don't show if they already verified
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

  return (
    <StoryBackground>
      <div className="container max-w-5xl mx-auto text-center z-10">
        {/* Email verification banners */}
        <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
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

        <div className="container max-w-5xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-story-purple">
            Welcome to Storyland!
          </h1>
          
          <div className="card-kiddy mb-10">
            <div className="flex justify-center mb-6">
              <Moon className="h-16 w-16 text-story-purple animate-float" />
            </div>
            <h2 className="text-2xl font-bold mb-6">Time for a bedtime story!</h2>
            <p className="text-lg mb-8">
              The story generator is coming soon! Check back later to create magical bedtime adventures.
            </p>
            <div className="flex justify-center">
              <Link to="/create-story">
                <Button className="px-8 py-6 text-xl rounded-2xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                  <Star className="mr-2 h-5 w-5" />
                  <span>Create a Story</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-kiddy">
              <div className="flex justify-center mb-4">
                <div className="bg-story-yellow p-3 rounded-full">
                  <Book className="h-8 w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">My Stories</h3>
              <p className="mb-4">View all your saved stories here.</p>
              <Button variant="outline" className="w-full bg-white border-2 border-story-blue text-story-blue hover:bg-story-blue/10 button-bounce">
                View My Stories
              </Button>
            </div>
            
            <div className="card-kiddy">
              <div className="flex justify-center mb-4">
                <div className="bg-story-pink p-3 rounded-full">
                  <Settings className="h-8 w-8 text-story-purple" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Account Settings</h3>
              <p className="mb-4">Manage your profile and parental controls.</p>
              <Link to="/account-settings">
                <Button variant="outline" className="w-full bg-white border-2 border-story-blue text-story-blue hover:bg-story-blue/10 button-bounce">
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StoryBackground>
  );
};

export default Dashboard;
