
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

  const handleSuccess = (token: string, userData?: { name?: string; email?: string }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('loginMethod', 'email');
    // Save user name and email for menu usage
    if (userData?.name) localStorage.setItem('userName', userData.name);
    if (userData?.email) localStorage.setItem('userEmail', userData.email);

    toast({
      title: mode === 'login' ? 'Welcome back!' : 'Account created!',
      description: mode === 'login'
        ? 'You have successfully logged in.'
        : 'Your account has been created successfully.',
    });
    navigate('/a/library');
  };

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response) => {
      // Only key is returned from login endpoint
      handleSuccess(
        response.data.key,
        {
          name: name,
          email: email,
        }
      );
    },
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
    onSuccess: (response) => {
      // Only key is returned from registration endpoint
      handleSuccess(
        response.data.key,
        {
          name: name,
          email: email,
        }
      );
    },
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
