import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RootLayout from './root-layout';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to={'/login-page'} replace />;
  }

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default ProtectedLayout;
