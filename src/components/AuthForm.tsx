import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CloudMoon, CloudSun, Stars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi, LoginData, RegisterData } from '@/lib/api';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './GoogleLoginButton';
import AuthFormGoogleSection from './AuthFormGoogleSection';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  initialMode?: AuthMode;
}

const AuthForm = ({ initialMode = 'login' }: AuthFormProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
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
    onSuccess: (response) => {
      console.log("🚀 Login API response:", response.data);
      handleSuccess(response.data.key);
    },    onError: (error: any) => {
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

    if (mode === 'register' && !name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your name.',
        variant: 'destructive',
      });
      return;
    }

    if (mode === 'login') {
      login({ email, password });
    } else {
      // Send single `name` field instead of splitting
      register({ 
        email, 
        password1: password,
        password2: confirmPassword,
        name,
      });
    }
  };
  
  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:8000/accounts/google/login/?process=login';
  };

  const loading = isLoginPending || isRegisterPending;

  return (
    <div className="w-full max-w-2xl mx-auto">
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

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg mb-1">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-kiddy w-full"
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>
          )}
          
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

          {/* Google Login section extracted for clarity */}
          <AuthFormGoogleSection loading={loading} />
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
