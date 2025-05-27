import { useMutation } from '@tanstack/react-query';
import { SigninFormFields } from '../../../utils/validate';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: SigninFormFields) => {
      return login(data);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    },
  });
};
