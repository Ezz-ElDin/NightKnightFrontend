
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect unauthenticated users to login, preserve path for redirect-after-login if wanted
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [navigate, location]);

  return <>{children}</>;
};

export default RequireAuth;
