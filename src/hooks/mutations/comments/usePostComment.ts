import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../../apis/lp-detail';

const usePostComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(String(lpId), content),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', lpId]);
    },
  });
};

export default usePostComment;
