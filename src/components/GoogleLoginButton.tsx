
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface GoogleLoginButtonProps {
  disabled?: boolean;
}

const GoogleLoginButton = ({ disabled }: GoogleLoginButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const access_token = credentialResponse.credential;
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
        'https://api.nightknight.app/api/auth/google/',
        { access_token },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const key = res.data.key;
      localStorage.setItem('authToken', key);
      toast({
        title: 'Welcome!',
        description: 'Logged in via Google successfully.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Google login failed',
        description: error?.response?.data?.detail || 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleError = () => {
    toast({
      title: 'Google login failed',
      description: 'Error during Google authentication.',
      variant: 'destructive',
    });
  };

  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : ''}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="continue_with"
        width="100%"
        // disabled prop removed as it's not supported
      />
    </div>
  );
};

export default GoogleLoginButton;

