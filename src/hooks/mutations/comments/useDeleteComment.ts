import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../../apis/lp-detail';

const useDeleteComment = (lpId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', lpId]);
    },
  });
};

export default useDeleteComment;
