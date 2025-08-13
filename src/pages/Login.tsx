
import AuthForm from "@/components/AuthForm";
import StoryBackground from "@/components/StoryBackground";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  // Handle redirect after login
  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    const token = localStorage.getItem('authToken');
    
    if (token && redirectPath) {
      localStorage.removeItem('redirectAfterLogin');
      window.location.href = redirectPath;
    }
  }, []);

  return (
    <StoryBackground>
      <AuthForm initialMode="login" />
      <div className="text-center mt-4">
        <Link 
          to="/forgot-password" 
          className="text-story-blue hover:underline text-sm"
        >
          Forgot your password?
        </Link>
      </div>
    </StoryBackground>
  );
};

export default Login;
