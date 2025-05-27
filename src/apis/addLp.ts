import { CreateLpDto, Tag } from '../types/lp';
import { axiosInstance } from './axios';

export async function postLp(lpData: CreateLpDto) {
  const preparedData = {
    ...lpData,
    tags: lpData.tags.map((tag: Tag) => tag.name),
  };

  // console.log('전송 데이터:', preparedData);
  const response = await axiosInstance.post('/v1/lps', preparedData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/v1/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data.imageUrl;
}
