
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Check, Info, X } from "lucide-react";

const EMAIL_VERIFIED_FLAG = "email_verified_success_banner_dismissed";
const EMAIL_DISMISS_INFO = "email_verify_info_banner_dismissed";

interface EmailVerificationBannersProps {
  shouldShow: boolean;
}

const EmailVerificationBanners = ({ shouldShow }: EmailVerificationBannersProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Show "success" banner if verification just happened or status=success
  useEffect(() => {
    if (!shouldShow) return;
    const verifiedInQuery = new URLSearchParams(location.search).get("verified") === "1";
    const statusSuccess = new URLSearchParams(location.search).get("status") === "success";
    const successDismissed = localStorage.getItem(EMAIL_VERIFIED_FLAG) === "1";
    
    if ((verifiedInQuery || statusSuccess) && !successDismissed) {
      setShowSuccess(true);
      const params = new URLSearchParams(location.search);
      params.delete("verified");
      params.delete("status");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  // Show "invalid" banner if status=invalid
  useEffect(() => {
    if (!shouldShow) return;
    const statusInvalid = new URLSearchParams(location.search).get("status") === "invalid";
    
    if (statusInvalid) {
      setShowInvalid(true);
      const params = new URLSearchParams(location.search);
      params.delete("status");
      navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
    }
  }, [shouldShow, location.search, navigate]);

  useEffect(() => {
    if (!shouldShow) return;
    const needsVerification = new URLSearchParams(location.search).get("needsVerification") === "1";
    const infoDismissed = localStorage.getItem(EMAIL_DISMISS_INFO) === "1";
    const successDismissed = localStorage.getItem(EMAIL_VERIFIED_FLAG) === "1";
    
    if ((needsVerification || !infoDismissed) && !successDismissed) {
      setShowInfo(true);
      // Clean up the URL parameter
      if (needsVerification) {
        const params = new URLSearchParams(location.search);
        params.delete("needsVerification");
        navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
      }
    }
  }, [shouldShow, location.search, navigate]);

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    localStorage.setItem(EMAIL_VERIFIED_FLAG, "1");
    setShowInfo(false);
  };

  const handleDismissInfo = () => {
    setShowInfo(false);
    localStorage.setItem(EMAIL_DISMISS_INFO, "1");
  };

  const handleDismissInvalid = () => {
    setShowInvalid(false);
  };

  if (!shouldShow) return null;
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto mb-4">
      {showSuccess && (
        <Alert variant="default" className="flex items-center justify-between bg-green-50 border-green-200 text-green-900 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <Check className="h-6 w-6 text-green-600" />
            <div>
              <AlertTitle className="font-semibold">Email Successfully Verified</AlertTitle>
              <AlertDescription>
                Your email address has been successfully verified. You can now access all features.
              </AlertDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismissSuccess} className="ml-2" aria-label="Dismiss success alert">
            ✕
          </Button>
        </Alert>
      )}
      {showInvalid && (
        <Alert variant="destructive" className="flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <X className="h-6 w-6" />
            <div>
              <AlertTitle className="font-semibold">Invalid Verification Link</AlertTitle>
              <AlertDescription>
                The verification link is invalid or has expired. Please request a new verification email.
              </AlertDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismissInvalid} className="ml-2" aria-label="Dismiss error alert">
            ✕
          </Button>
        </Alert>
      )}
      {showInfo && (
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
  );
};

export default EmailVerificationBanners;
