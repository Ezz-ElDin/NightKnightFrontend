
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';

interface UseAuthFormProps {
  initialMode?: 'login' | 'register';
}

export const useAuthForm = ({ initialMode = 'login' }: UseAuthFormProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }

        const response = await authApi.register({
          email,
          password1: password,
          password2: confirmPassword,
          name,
        });

        if (response.data.key) {
          localStorage.setItem('authToken', response.data.key);
          localStorage.setItem('loginMethod', 'email');
          
          // Dispatch event for navbar updates
          window.dispatchEvent(new Event('user-info-updated'));
          
          toast.success('Account created successfully!');
          
          // Check for redirect after login
          const redirectPath = localStorage.getItem('redirectAfterLogin');
          if (redirectPath) {
            localStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectPath;
          } else {
            navigate('/library');
          }
        }
      } else {
        const response = await authApi.login({ email, password });

        if (response.data.key) {
          localStorage.setItem('authToken', response.data.key);
          localStorage.setItem('loginMethod', 'email');
          
          // Dispatch event for navbar updates
          window.dispatchEvent(new Event('user-info-updated'));
          
          toast.success('Logged in successfully!');
          
          // Check for redirect after login
          const redirectPath = localStorage.getItem('redirectAfterLogin');
          if (redirectPath) {
            localStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectPath;
          } else {
            navigate('/library');
          }
        }
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 
                          error?.response?.data?.message || 
                          'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    handleSubmit,
    loading,
  };
};
