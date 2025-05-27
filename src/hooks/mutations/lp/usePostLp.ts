import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLp } from '../../../apis/addLp';
import { QUERY_KEY } from '../../../constants/key';

export default function usePostLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

      if (data?.data?.id) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.lps, data.data.id],
        });
      }
    },
  });
}
