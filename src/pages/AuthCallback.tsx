
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { stripeApi } from '@/lib/api';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('authToken', token);
      
      // Check if there's a redirect path stored
      const redirectPath = localStorage.getItem('redirectAfterAuth');
      const stripePayload = localStorage.getItem('stripePayload');
      
      if (redirectPath === '/api/stripe/checkout/' && stripePayload) {
        // Handle Stripe checkout redirect
        const handleStripeCheckout = async () => {
          try {
            const payload = JSON.parse(stripePayload);
            const response = await stripeApi.createCheckout(payload);
            
            if (response.success && response.data.location) {
              // Clean up localStorage
              localStorage.removeItem('redirectAfterAuth');
              localStorage.removeItem('stripePayload');
              localStorage.removeItem('selectedPlan');
              
              // Open Stripe checkout in a new tab
              window.open(response.data.location, '_blank');
              
              // Navigate to library
              navigate('/library');
            } else {
              toast({
                title: 'Error',
                description: 'Failed to create checkout session',
                variant: 'destructive',
              });
              navigate('/library');
            }
          } catch (error) {
            console.error('Stripe checkout error:', error);
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again.',
              variant: 'destructive',
            });
            // Clean up localStorage on error
            localStorage.removeItem('redirectAfterAuth');
            localStorage.removeItem('stripePayload');
            localStorage.removeItem('selectedPlan');
            navigate('/library');
          }
        };
        
        handleStripeCheckout();
      } else if (redirectPath && redirectPath !== '/api/stripe/checkout/') {
        // Handle other redirect paths
        localStorage.removeItem('redirectAfterAuth');
        localStorage.removeItem('selectedPlan');
        navigate(redirectPath);
      } else {
        // Default redirect to library
        navigate('/library');
      }
    } else {
      toast({
        title: 'Authentication Error',
        description: 'No token received from authentication provider.',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-story-purple"></div>
    </div>
  );
};

export default AuthCallback;
