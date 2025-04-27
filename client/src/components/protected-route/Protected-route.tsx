import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/userStore';

interface ProtectedRouteProps {
  children: ReactNode; // Type for the `children` prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get the `token` from the Zustand store to check if the user is authenticated
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // Redirect to login if the token is not available (i.e., not authenticated)
    return <Navigate to="/" replace />;
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
