import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetInfiniteComments } from '../queries/useGetInfiniteLpDetail';
import usePostComment from '../mutations/comments/usePostComment';
import useUpdateComment from '../mutations/comments/useUpdateComment';
import useDeleteComment from '../mutations/comments/useDeleteComment';

const useLpComments = (lpId: number) => {
  const [commentOrder, setCommentOrder] = useState<'desc' | 'asc'>('desc');
  const [commentContent, setCommentContent] = useState('');
  const COMMENTS_PER_PAGE = 5;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
    error: commentsError,
    refetch,
  } = useGetInfiniteComments(lpId, COMMENTS_PER_PAGE, '', commentOrder);

  const { mutate: postComment } = usePostComment(lpId);
  const { mutate: updateComment } = useUpdateComment(lpId);
  const { mutate: deleteCommentMutate } = useDeleteComment(lpId);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    postComment(commentContent, {
      onSuccess: () => {
        setCommentContent('');
        refetch();
      },
    });
  };

  const handleUpdateComment = (commentId: number, content: string) => {
    updateComment(
      { commentId, content },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutate(commentId, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return {
    commentsData,
    isCommentsLoading,
    commentsError,
    commentOrder,
    setCommentOrder,
    commentContent,
    setCommentContent,
    handleSubmitComment,
    handleUpdateComment,
    handleDeleteComment,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ref,
    inView,
  };
};

export default useLpComments;
