
import AuthForm from "@/components/AuthForm";
import StoryBackground from "@/components/StoryBackground";
import { useEffect } from "react";

const Register = () => {
  // Handle redirect after registration
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
      <AuthForm initialMode="register" />
    </StoryBackground>
  );
};

export default Register;
