
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthFormGoogleSectionProps {
  loading: boolean;
}

/**
 * Renders the Google OAuth provider and login button for the AuthForm.
 * NOTE: Replace the clientId string below with your real Google client ID.
 */
const AuthFormGoogleSection = ({ loading }: AuthFormGoogleSectionProps) => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <div className="my-2">
      <GoogleLoginButton disabled={loading} />
    </div>
  </GoogleOAuthProvider>
);

export default AuthFormGoogleSection;
