
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Stars } from 'lucide-react';
import React from 'react';
import { AuthMode } from './hooks/useAuthForm';

interface AuthFormFieldsProps {
  mode: AuthMode;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  loading: boolean;
}

const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  mode, email, setEmail, password, setPassword,
  confirmPassword, setConfirmPassword, name, setName, loading
}) => (
  <>
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
  </>
);

export default AuthFormFields;
