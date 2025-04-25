import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CloudMoon, CloudSun, Stars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi, LoginData, RegisterData } from '@/lib/api';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  initialMode?: AuthMode;
}

const AuthForm = ({ initialMode = 'login' }: AuthFormProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    toast({
      title: mode === 'login' ? 'Welcome back!' : 'Account created!',
      description: mode === 'login' 
        ? 'You have successfully logged in.' 
        : 'Your account has been created successfully.',
    });
    navigate('/dashboard');
  };

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response) => handleSuccess(response.data.key),
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (response) => handleSuccess(response.data.key),
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'register' && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    if (mode === 'login') {
      login({ email, password });
    } else {
      register({ 
        email, 
        password1: password,
        password2: confirmPassword 
      });
    }
  };
  
  const handleGoogleSignup = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      'http://localhost:8000/accounts/google/login/?process=login',
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const loading = isLoginPending || isRegisterPending;

  return (
    <div className="w-full max-w-md">
      <div className="card-kiddy">
        <div className="flex justify-center mb-6">
          {mode === 'login' ? (
            <CloudMoon className="h-16 w-16 text-story-purple animate-float" />
          ) : (
            <CloudSun className="h-16 w-16 text-story-blue animate-float" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-6">
          {mode === 'login' ? 'Welcome Back!' : 'Join the Fun!'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-kiddy"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-kiddy"
              placeholder="Enter your password"
              required
            />
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-lg">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-kiddy"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Stars className="h-5 w-5 animate-spin" />
                <span>{mode === 'login' ? 'Logging in...' : 'Creating account...'}</span>
              </div>
            ) : (
              <span>{mode === 'login' ? 'Login' : 'Create Account'}</span>
            )}
          </Button>
          
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <Button 
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            className="w-full h-12 text-lg rounded-xl border-2 border-story-blue flex items-center justify-center gap-2 button-bounce"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            <span>{mode === 'login' ? 'Login with Google' : 'Sign up with Google'}</span>
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="ml-2 text-story-blue hover:underline font-semibold"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
