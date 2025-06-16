
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import StoryBackground from '@/components/StoryBackground';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setEmailSent(true);
      toast({
        title: 'Reset email sent!',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error: any) {
      console.error('Forgot password error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to send reset email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <StoryBackground>
        <div className="w-full max-w-md mx-auto">
          <div className="card-kiddy text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-story-purple">
              Check Your Email
            </h2>
            
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to{' '}
              <span className="font-semibold">{email}</span>
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full border-story-purple text-story-purple hover:bg-story-purple/10"
              >
                Try Again
              </Button>
              
              <Link to="/a/login">
                <Button
                  variant="ghost"
                  className="w-full text-story-blue hover:bg-story-blue/10 gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </StoryBackground>
    );
  }

  return (
    <StoryBackground>
      <div className="w-full max-w-md mx-auto">
        <div className="card-kiddy">
          <div className="flex justify-center mb-6">
            <Mail className="h-16 w-16 text-story-blue animate-float" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-6 text-story-purple">
            Forgot Password?
          </h2>
          
          <p className="text-center text-gray-600 mb-8">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">Email Address</Label>
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

            <Button 
              type="submit" 
              className="w-full h-12 text-lg rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 animate-pulse" />
                  <span>Sending...</span>
                </div>
              ) : (
                <span>Send Reset Email</span>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/a/login">
              <Button
                variant="ghost"
                className="text-story-blue hover:bg-story-blue/10 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StoryBackground>
  );
};

export default ForgotPassword;
