import { TPaginateParams, TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TUserForm, TUserResponse, TUpdateUserParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchUsers = async (params: TPaginateParams): Promise<TPaginateResponse<TUserResponse>> => {
  const result = await axios.get<TPaginateResponse<TUserResponse>>(`${versionApi.VERSION_V1}/master-data/users`, {
    params,
  });
  return result.data;
};

export const fetchUserDetails = async (id: TUserResponse['id']): Promise<TUserResponse> => {
  const result = await axios.get<TResponseData<TUserResponse>>(`${versionApi.VERSION_V1}/master-data/users/${id}`);
  return result.data.data;
};

export const createUser = async (data: TUserForm): Promise<TUserResponse> => {
  const result = await axios.post<TResponseData<TUserResponse>>(`${versionApi.VERSION_V1}/master-data/users`, data);
  return result.data.data;
};

export const updateUser = async (params: TUpdateUserParams): Promise<TUserResponse> => {
  const result = await axios.patch<TResponseData<TUserResponse>>(
    `${versionApi.VERSION_V1}/master-data/users/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteUser = async (id: TUserResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/users/${id}`);
  return result.data.data;
};
