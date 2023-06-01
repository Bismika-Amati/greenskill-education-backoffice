import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TEarlyAdopterResponse, TEarlyAdopterForm, TUpdateEarlyAdopterParams, TEarlyAdoptersParams } from './entities';
import axios from '@/utils/axios';

export const fetchEarlyAdopters = async (
  params: TEarlyAdoptersParams,
): Promise<TPaginateResponse<TEarlyAdopterResponse>> => {
  const result = await axios.get<TPaginateResponse<TEarlyAdopterResponse>>(
    `${versionApi.VERSION_V1}/master-data/early-adopters`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchEarlyAdopterDetails = async (id: TEarlyAdopterResponse['id']): Promise<TEarlyAdopterResponse> => {
  const result = await axios.get<TResponseData<TEarlyAdopterResponse>>(
    `${versionApi.VERSION_V1}/master-data/early-adopters/${id}`,
  );
  return result.data.data;
};

export const createEarlyAdopter = async (data: TEarlyAdopterForm): Promise<TEarlyAdopterResponse> => {
  const result = await axios.post<TResponseData<TEarlyAdopterResponse>>(
    `${versionApi.VERSION_V1}/master-data/early-adopters`,
    data,
  );
  return result.data.data;
};

export const updateEarlyAdopter = async (params: TUpdateEarlyAdopterParams): Promise<TEarlyAdopterResponse> => {
  const result = await axios.patch<TResponseData<TEarlyAdopterResponse>>(
    `${versionApi.VERSION_V1}/master-data/early-adopters/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteEarlyAdopter = async (id: TEarlyAdopterResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/early-adopters/${id}`);
  return result.data.data;
};
