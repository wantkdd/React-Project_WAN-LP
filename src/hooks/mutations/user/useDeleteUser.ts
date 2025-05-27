import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../apis/auth';
import { useAuth } from '../../../context/AuthContext';

const useDeleteUser = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      alert('회원 탈퇴가 완료되었습니다.');
      await logout();
      navigate('/');
    },
  });
};

export default useDeleteUser;
