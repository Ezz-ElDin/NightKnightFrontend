
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthFormGoogleSectionProps {
  loading: boolean;
}

/**
 * Renders the Google OAuth provider and login button for the AuthForm.
 * NOTE: Replace the clientId string below with your real Google client ID.
 */
const AuthFormGoogleSection = ({ loading }: AuthFormGoogleSectionProps) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.warn('VITE_GOOGLE_CLIENT_ID is not set — hiding Google login button.');
    return null;
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="my-2">
        <GoogleLoginButton disabled={loading} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthFormGoogleSection;
