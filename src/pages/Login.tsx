
import AuthForm from "@/components/AuthForm";
import StoryBackground from "@/components/StoryBackground";
import { Link } from "react-router-dom";

const Login = () => {
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
