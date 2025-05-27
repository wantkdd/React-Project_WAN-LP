import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/mutations/user/useLogout';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { accessToken, userInfo } = useAuth();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | undefined>(userInfo?.name);

  useEffect(() => {
    if (userInfo?.name) {
      setUserName(userInfo.name);
    }
  }, [userInfo]);

  const handleLogout = async () => {
    await logout();
    navigate('/login-page');
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="text-white mr-3 ">
            <span className="block w-6 h-6">☰</span>
          </button>
          <Link to="/" className="text-pink-500 text-2xl font-bold">
            WAN LP
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/search-page">
            <span className="w-10 h-10 text-2xl mr-3">🔍</span>
          </Link>
          {accessToken && userName && (
            <span className="text-white mr-4 hidden md:block">
              {userName}님 반갑습니다.
            </span>
          )}

          <div className="flex space-x-2">
            {!accessToken ? (
              <>
                <Link
                  to="/login-page"
                  className="py-2 px-4 rounded bg-pink-500 text-white hover:opacity-80"
                >
                  로그인
                </Link>
                <Link
                  to="/signup-page"
                  className="py-2 px-4 rounded bg-pink-500 text-white hover:opacity-80"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="py-2 px-4 rounded bg-pink-500 text-white hover:opacity-80"
              >
                로그아웃
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
