import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TRoleForm, TRoleResponse, TRolesParams, TUpdateRoleParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchRoles = async (params: TRolesParams): Promise<TPaginateResponse<TRoleResponse>> => {
  const result = await axios.get<TPaginateResponse<TRoleResponse>>(`${versionApi.VERSION_V1}/master-data/roles`, {
    params,
  });
  return result.data;
};

export const fetchRoleDetails = async (id: TRoleResponse['id']): Promise<TRoleResponse> => {
  const result = await axios.get<TResponseData<TRoleResponse>>(`${versionApi.VERSION_V1}/master-data/roles/${id}`);
  return result.data.data;
};

export const createRole = async (data: TRoleForm): Promise<TRoleResponse> => {
  const result = await axios.post<TResponseData<TRoleResponse>>(`${versionApi.VERSION_V1}/master-data/roles`, data);
  return result.data.data;
};

export const updateRole = async (params: TUpdateRoleParams): Promise<TRoleResponse> => {
  const result = await axios.patch<TResponseData<TRoleResponse>>(
    `${versionApi.VERSION_V1}/master-data/roles/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteRole = async (id: TRoleResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/roles/${id}`);
  return result.data.data;
};
