import { LOCAL_STORAGE_KEY } from '../constants/key';
import {
  PatchUserInfoDto,
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
} from '../types/auth';
import { axiosInstance } from './axios';

export const postSignup = async (
  body: RequestSignupDto
): Promise<RequestSignupDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signup', body);

  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signin', body);

  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get('/v1/users/me');
  return data;
};

export const postLogout = async () => {
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

  const { data } = await axiosInstance.post('/v1/auth/signout', {
    refreshToken,
  });
  return data;
};

export const patchUserInfo = async (body: PatchUserInfoDto) => {
  const { data } = await axiosInstance.patch('/v1/users', body);
  return data;
};

export const deleteUser = async () => {
  return await axiosInstance.delete('/v1/users/');
};
