import React, { forwardRef } from 'react';
import { Comment } from '../../types/lp-detail';
import CommentSkeleton from './comment-skeleton';
import CommentItem from './comment';
import { useAuth } from '../../context/AuthContext';
import useGetMyInfo from '../../hooks/queries/useGetMyInfo';

interface LpCommentsProps {
  lpId: number;
  comments: Comment[];
  commentContent: string;
  setCommentContent: (content: string) => void;
  commentOrder: 'desc' | 'asc';
  setCommentOrder: (order: 'desc' | 'asc') => void;
  onSubmitComment: (e: React.FormEvent) => void;
  onUpdateComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  isLoading: boolean;
  hasError: unknown;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  ref: any;
}

const LpComments: React.FC<LpCommentsProps> = forwardRef(
  (
    {
      comments,
      commentContent,
      setCommentContent,
      commentOrder,
      setCommentOrder,
      onSubmitComment,
      onUpdateComment,
      onDeleteComment,
      isLoading,
      hasError,
      hasNextPage,
    },
    ref
  ) => {
    const { accessToken } = useAuth();
    const { data: me } = useGetMyInfo(accessToken);

    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">댓글</h2>
            <div className="flex space-x-2">
              <button
                className={`text-sm px-3 py-1 rounded ${
                  commentOrder === 'desc'
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setCommentOrder('desc')}
              >
                최신순
              </button>
              <button
                className={`text-sm px-3 py-1 rounded ${
                  commentOrder === 'asc'
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setCommentOrder('asc')}
              >
                오래된순
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-800">
          <form className="flex gap-3" onSubmit={onSubmitComment}>
            <div className="h-8 w-8 rounded-full bg-gray-700 flex-shrink-0">
              <img
                src={me?.data.avatar ?? undefined}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 작성하세요"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-pink-500 resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded text-sm"
                >
                  등록
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="p-4">
          {isLoading && (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          )}

          {!isLoading && !hasError && (
            <>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  isMyComment={comment.author.id === me?.data.id}
                  onUpdate={onUpdateComment}
                  onDelete={onDeleteComment}
                />
              ))}
              {hasNextPage && <div ref={ref} className="h-4" />}
            </>
          )}
        </div>
      </div>
    );
  }
);

export default LpComments;
