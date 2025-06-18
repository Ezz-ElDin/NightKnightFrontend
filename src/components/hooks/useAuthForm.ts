import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { authApi, LoginData, RegisterData } from '@/lib/api';

export type AuthMode = 'login' | 'register';

interface UseAuthFormProps {
  initialMode?: AuthMode;
}

export const useAuthForm = ({ initialMode = 'login' }: UseAuthFormProps = {}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginSuccess = (token: string, userData?: { name?: string; email?: string }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('loginMethod', 'email');
    // Save user name and email for menu usage
    if (userData?.name) localStorage.setItem('userName', userData.name);
    if (userData?.email) localStorage.setItem('userEmail', userData.email);

    toast({
      title: 'Welcome back!',
      description: 'You have successfully logged in.',
    });
    navigate('/a/library');
  };

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response) => {
      // Only key is returned from login endpoint
      handleLoginSuccess(
        response.data.key,
        {
          name: name,
          email: email,
        }
      );
    },
    onError: (error: any) => {
      // Check if the error is about email not being verified
      if (error.response?.data?.non_field_errors?.[0]?.includes('E-mail is not verified')) {
        toast({
          title: 'Email not verified',
          description: 'Please check your email and verify your account before logging in.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.response?.data?.detail || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (response) => {
      // On successful registration, redirect to login page with verification prompt
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account before logging in.',
      });
      navigate('/a/login?needsVerification=1');
    },
    onError: (error: any) => {
      // Check if the error is about email already existing
      if (error.response?.data?.email?.[0]?.includes('A user with this email already exists')) {
        toast({
          title: 'Email already exists',
          description: 'Try logging in or use a different email.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.response?.data?.detail || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
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
      register({
        email,
        password1: password,
        password2: confirmPassword,
        name,
      });
    }
  };

  const loading = isLoginPending || isRegisterPending;

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
