
import AuthForm from "@/components/AuthForm";
import StoryBackground from "@/components/StoryBackground";

const Register = () => {
  return (
    <StoryBackground>
      <AuthForm initialMode="register" />
    </StoryBackground>
  );
};

export default Register;
