import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");

  // If we have a token but no currentUser, we're still loading
  if (token && !currentUser) {
    return null; // or a loading spinner
  }

  // If we have no token or no currentUser, redirect to login
  if (!token || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
