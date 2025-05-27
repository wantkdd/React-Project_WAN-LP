import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useLpDetail from '../hooks/custom/useLpDetail';
import useLpComments from '../hooks/custom/useLpComments';
import LpInfo from '../components/lp-detail/LpInfo';
import LpEdit from '../components/lp-detail/LpEdit';
import LpComments from '../components/lp-detail/LpComments';
import DeleteModal from '../components/lp-detail/DeleteModal';

const LpDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const lpId = Number(id);

  const {
    lpData,
    isLpLoading,
    lpError,
    isEditMode,
    setIsEditMode,
    handleLikeLp,
    handleDislikeLp,
    isLiked,
    deleteLp,
  } = useLpDetail(lpId, accessToken);

  const {
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
    hasNextPage,
    isFetchingNextPage,
    ref,
  } = useLpComments(lpId);

  if (isLpLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-xl text-white mb-4">로딩 중...</h2>
      </div>
    );
  }

  if (lpError || !lpData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-red-500 mb-4">LP를 불러오지 못했습니다.</h2>
      </div>
    );
  }

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCancelDelete = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => deleteLp(lpId);

  const comments = commentsData?.pages.flatMap((page) => page.data.data) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-3xl mx-auto py-8 px-4">
        {isEditMode ? (
          <LpEdit
            lpData={lpData}
            onCancel={() => setIsEditMode(false)}
            onDelete={handleDeleteClick}
          />
        ) : (
          <LpInfo
            lpData={lpData}
            isLiked={isLiked}
            onLike={handleLikeLp}
            onDislike={handleDislikeLp}
            onEdit={() => setIsEditMode(true)}
            onDelete={handleDeleteClick}
          />
        )}

        <LpComments
          lpId={lpId}
          comments={comments}
          commentContent={commentContent}
          setCommentContent={setCommentContent}
          commentOrder={commentOrder}
          setCommentOrder={setCommentOrder}
          onSubmitComment={handleSubmitComment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          isLoading={isCommentsLoading}
          hasError={commentsError}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          ref={ref}
        />

        {showDeleteModal && (
          <DeleteModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}
      </main>
    </div>
  );
};

export default LpDetailPage;
