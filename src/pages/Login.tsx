
import AuthForm from "@/components/AuthForm";
import StoryBackground from "@/components/StoryBackground";

const Login = () => {
  return (
    <StoryBackground>
      <AuthForm initialMode="login" />
    </StoryBackground>
  );
};

export default Login;
