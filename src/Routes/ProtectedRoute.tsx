import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';


interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect unauthenticated users to login
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect users without the required role
    return <Navigate to="/unauthorized" />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;
