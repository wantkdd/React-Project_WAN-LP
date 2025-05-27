import { useMutation } from '@tanstack/react-query';
import { deleteLike } from '../../../apis/like';
import { queryClient } from '../../../App';
import { QUERY_KEY } from '../../../constants/key';
import { LpDetailData } from '../../../types/lp-detail';
import useGetMyInfo from '../../queries/useGetMyInfo';
import { useAuth } from '../../../context/AuthContext';

function useDeleteLike() {
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  return useMutation({
    mutationFn: deleteLike,

    onMutate: async (lpId: number) => {
      //Optimistic update
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });
      const previousData = queryClient.getQueryData<LpDetailData>([
        QUERY_KEY.lps,
        lpId,
      ]);

      if (previousData && me?.data.id) {
        queryClient.setQueryData<LpDetailData>([QUERY_KEY.lps, lpId], {
          ...previousData,
          likes: previousData.likes.filter(
            (like) => like.userId !== me.data.id
          ),
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
    onError: (error, lpId, context) => {
      console.error('좋아요 취소 실패:', error);

      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.lps, lpId], context.previousData);
      }
    },
  });
}

export default useDeleteLike;
