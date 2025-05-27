import { PaginationDto } from '../types/common';
import { ResponseLpListDto } from '../types/lp';
import { axiosInstance } from './axios';

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });
  return data;
};

export const deleteLp = async (lpId: number): Promise<boolean> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data.data;
};
