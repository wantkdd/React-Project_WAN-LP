import { useState } from 'react';
import { useGetLpDetail } from '../queries/useGetLpDetail';
import useGetMyInfo from '../queries/useGetMyInfo';
import usePostLike from '../mutations/like/usePostLike';
import useDeleteLike from '../mutations/like/useDeleteLikte';
import { useDeleteLp } from '../mutations/lp/useDeleteLp';

const useLpDetail = (lpId: number, accessToken: string | null) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const {
    data: lpData,
    isLoading: isLpLoading,
    error: lpError,
  } = useGetLpDetail(lpId);

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: deleteLp } = useDeleteLp();

  const isLiked = lpData?.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate(lpId);
  };

  const handleDislikeLp = () => {
    disLikeMutate(lpId);
  };

  return {
    lpData,
    isLpLoading,
    lpError,
    isEditMode,
    setIsEditMode,
    isPlaying,
    setIsPlaying,
    handleLikeLp,
    handleDislikeLp,
    isLiked,
    deleteLp,
  };
};

export default useLpDetail;
