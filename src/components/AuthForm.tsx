
import { CloudMoon, CloudSun } from 'lucide-react';
import AuthFormFields from './AuthFormFields';
import AuthFormGoogleSection from './AuthFormGoogleSection';
import { useAuthForm } from './hooks/useAuthForm';

interface AuthFormProps {
  initialMode?: 'login' | 'register';
}

const AuthForm = ({ initialMode = 'login' }: AuthFormProps) => {
  const {
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
    handleDemoLogin,
    loading,
  } = useAuthForm({ initialMode });

  // Comment out email/password registration AND login - uncomment to restore
  const showEmailPasswordForm = false; // mode === 'login' || mode === 'register';

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
        
        {showEmailPasswordForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormFields
              mode={mode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              name={name}
              setName={setName}
              loading={loading}
            />
            
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
          </form>
        )}

        {/* Comment out email/password registration AND login form above - uncomment to restore */}
        {/* 
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthFormFields
            mode={mode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            name={name}
            setName={setName}
            loading={loading}
          />
          
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
        </form>
        */}

        <AuthFormGoogleSection loading={loading} />
        
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
