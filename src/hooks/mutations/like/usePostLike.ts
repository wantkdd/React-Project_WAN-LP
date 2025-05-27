import { useMutation } from '@tanstack/react-query';
import { postLike } from '../../../apis/like';
import { QUERY_KEY } from '../../../constants/key';
import { queryClient } from '../../../App';
import { LpDetailData } from '../../../types/lp-detail';
import useGetMyInfo from '../../queries/useGetMyInfo';
import { useAuth } from '../../../context/AuthContext';

function usePostLike() {
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  return useMutation({
    mutationFn: postLike,

    onMutate: async (lpId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      const previousData = queryClient.getQueryData<LpDetailData>([
        QUERY_KEY.lps,
        lpId,
      ]);

      if (previousData && me?.data.id) {
        queryClient.setQueryData<LpDetailData>([QUERY_KEY.lps, lpId], {
          ...previousData,
          likes: [
            ...previousData.likes,
            {
              id: Date.now(),
              userId: me.data.id,
              lpId: lpId,
            },
          ],
        });
      }

      return { previousData };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
  });
}

export default usePostLike;
