import { Outlet } from 'react-router-dom';

const SuperAdminLayout = () => (
  <div>
    <header>Super Admin Header</header>
    <main>
      <Outlet />
    </main>
    <footer>Super Admin Footer</footer>
  </div>
);

export default SuperAdminLayout;
