import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TSubModuleForm, TSubModuleResponse, TSubModulesParams, TUpdateSubModuleParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchSubModules = async (params: TSubModulesParams): Promise<TPaginateResponse<TSubModuleResponse>> => {
  const result = await axios.get<TPaginateResponse<TSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/sub-modules`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchSubModuleDetails = async (id: TSubModuleResponse['id']): Promise<TSubModuleResponse> => {
  const result = await axios.get<TResponseData<TSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/sub-modules/${id}`,
  );
  return result.data.data;
};

export const createSubModule = async (data: TSubModuleForm): Promise<TSubModuleResponse> => {
  const result = await axios.post<TResponseData<TSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/sub-modules`,
    data,
  );
  return result.data.data;
};

export const updateSubModule = async (params: TUpdateSubModuleParams): Promise<TSubModuleResponse> => {
  const result = await axios.patch<TResponseData<TSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/sub-modules/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteSubModule = async (id: TSubModuleResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/sub-modules/${id}`);
  return result.data.data;
};
