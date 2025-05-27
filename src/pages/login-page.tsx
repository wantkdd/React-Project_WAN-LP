import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/googleLogin';
import LoginForm from '../components/login-form';

const LoginPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/my-page');
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
        <div className="flex items-center w-90 mb-4">
          <Link to="/" className="flex text-white text-2xl">
            &lt;
          </Link>
          <span className="text-4xl font-bold text-white flex-grow text-center">
            로그인
          </span>
        </div>

        <GoogleLoginButton />

        <div className="flex items-center mb-4 w-90 relative">
          <hr className="flex-grow border-t border-white" />
          <span className="mx-2 bg-gray-800 px-2 text-white">OR</span>
          <hr className="flex-grow border-t border-white" />
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
