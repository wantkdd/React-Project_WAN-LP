import { axiosInstance } from './axios';
import {
  LpDetailResponse,
  CommentsResponse,
  LpDetailData,
  UpdateLpRequest,
} from '../types/lp-detail';
import { PaginationDto } from '../types/common';

export const getLpDetail = async (id: number): Promise<LpDetailData> => {
  const { data } = await axiosInstance.get<LpDetailResponse>(`/v1/lps/${id}`);
  return data.data;
};

export const getComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: number;
} & PaginationDto): Promise<CommentsResponse> => {
  const { data } = await axiosInstance.get<CommentsResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
    }
  );
  return data;
};

export const createComment = async (
  lpId: string,
  content: string
): Promise<Comment> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data.data;
};

export const updateComment = async (
  lpId: number,
  commentId: number,
  content: string
) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );
  return data.data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data.data;
};

export const updateLp = async ({
  lpId,
  payload,
}: {
  lpId: number;
  payload: UpdateLpRequest;
}): Promise<LpDetailData> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, payload);
  return data.data;
};
