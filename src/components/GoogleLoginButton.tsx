
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface GoogleLoginButtonProps {
  disabled?: boolean;
}

const GoogleLoginButton = ({ disabled }: GoogleLoginButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      if (!access_token) {
        toast({
          title: 'Google login failed',
          description: 'No access token received.',
          variant: 'destructive',
        });
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/google/`,
          { access_token },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const key = res.data.key;
        localStorage.setItem('authToken', key);
        localStorage.setItem('loginMethod', 'google');

        // Fire custom event so Navbar/Menu listeners can update live
        window.dispatchEvent(new Event("user-info-updated"));

        toast({
          title: 'Welcome!',
          description: 'Logged in via Google successfully.',
        });

        navigate('/a/library');
      } catch (error: any) {
        toast({
          title: 'Google login failed',
          description: error?.response?.data?.detail || 'Please try again.',
          variant: 'destructive',
        });
      }
    },
    onError: () =>
      toast({
        title: 'Google login failed',
        description: 'Error during Google authentication.',
        variant: 'destructive',
      }),
    flow: 'implicit',
  });

  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : ''}>
      <button
        type="button"
        onClick={() => login()}
        className="bg-white border px-4 py-2 rounded shadow flex items-center justify-center w-full">
        <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
