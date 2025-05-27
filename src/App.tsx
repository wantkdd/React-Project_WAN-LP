import './App.css';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/my-page';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/googleLoginRedirect-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './pages/detail-page';
import SearchPage from './pages/search-page';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/search-page',
        element: <SearchPage />,
      },
      {
        path: '/login-page',
        element: <LoginPage />,
      },
      {
        path: '/signup-page',
        element: <SignupPage />,
      },
      { path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/my-page', element: <MyPage /> },
      { path: '/lp/:id', element: <LpDetailPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
