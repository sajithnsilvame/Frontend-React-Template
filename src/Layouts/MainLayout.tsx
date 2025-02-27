import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div>
    <header>Main Header</header>
    <main>
      <Outlet /> {/* Render matched child routes */}
    </main>
    <footer>Main Footer</footer>
  </div>
);

export default MainLayout;
