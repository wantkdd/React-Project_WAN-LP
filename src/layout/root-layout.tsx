import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import { PropsWithChildren, useState } from 'react';
import Footer from '../components/footer.tsx';
import Sidebar from '../components/sidebar.tsx';
import AddButton from '../components/add-lp/addButton.tsx';

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="bg-gray-800 flex flex-col h-screen">
      <Navbar onMenuClick={toggleSidebar} />
      <hr className="border-gray-700" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto flex flex-col min-h-full">
          <div className="flex-1 px-6">{children || <Outlet />}</div>
          <Footer />
        </main>

        <div className="fixed bottom-10 right-15">
          <AddButton />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
