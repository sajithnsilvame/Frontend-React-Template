import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../Layouts/AdminLayout';
import SuperAdminLayout from '../Layouts/SuperAdminLayout';
import MainLayout from '../Layouts/MainLayout';
import PublicPage from '../Pages/PublicPage';
import LoginPage from '../Pages/Auth/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import AdminPage from '../Pages/admin/AdminPage';
import SuperAdminPage from '../Pages/super-admin/SuperAdminPage';
import UnauthorizedPage from '../Pages/UnauthorizedPage';



const AppRouter = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PublicPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
        </Route>
      </Route>

      {/* Super Admin Routes */}
      <Route element={<ProtectedRoute requiredRole="super-admin" />}>
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminPage />} />
        </Route>
      </Route>

      {/* Unauthorized Access Route */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
