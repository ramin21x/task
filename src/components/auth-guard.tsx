import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthGuard: React.FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("key")) {
      if (location.pathname.includes("auth")) {
        navigate("/");
      }
    } else {
      if (!location.pathname.includes("auth")) {
        navigate("/auth/login");
      }
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};
