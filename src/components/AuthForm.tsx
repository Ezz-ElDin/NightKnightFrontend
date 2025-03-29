
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CloudMoon, CloudSun, Stars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here we would normally connect to our Django backend
      // For now, we'll simulate a successful login/registration
      
      setTimeout(() => {
        toast({
          title: mode === 'login' ? 'Welcome back!' : 'Account created!',
          description: mode === 'login' 
            ? 'You have successfully logged in.' 
            : 'Your account has been created successfully.',
          variant: 'default',
        });
        
        // Navigate to the dashboard after successful auth
        navigate('/dashboard');
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

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
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-kiddy"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          
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
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
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
