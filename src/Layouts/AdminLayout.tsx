import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div>
    <header>Admin Header</header>
    <main>
      <Outlet />
    </main>
    <footer>Admin Footer</footer>
  </div>
);

export default AdminLayout;
