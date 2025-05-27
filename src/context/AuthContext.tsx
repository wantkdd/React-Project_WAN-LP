import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from 'react';
import { RequestSigninDto } from '../types/auth';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postLogout, postSignin } from '../apis/auth';
import { useLocalStorage } from '../hooks/custom/useLocalStorage';
import axios from 'axios';
import { axiosInstance } from '../apis/axios';

interface UserInfo {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  setUserInfo: () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        try {
          const response = await axiosInstance.get('/v1/users/me');
          setUserInfo(response.data.data);
        } catch (error) {
          console.error('사용자 정보를 가져오는데 실패했습니다.', error);
        }
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          alert('로그인 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const logout = async () => {
    try {
      await postLogout();

      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert('로그아웃 성공!');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userInfo,
        setUserInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext 찾을 수 없음');
  }
  return context;
};
