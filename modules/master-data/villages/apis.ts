import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TVillageResponse, TVillageForm, TUpdateVillageParams, TVillagesParams } from './entities';
import axios from '@/utils/axios';

export const fetchVillages = async (params: TVillagesParams): Promise<TPaginateResponse<TVillageResponse>> => {
  const result = await axios.get<TPaginateResponse<TVillageResponse>>(`${versionApi.VERSION_V1}/master-data/villages`, {
    params,
  });
  return result.data;
};

export const fetchVillageDetails = async (id: TVillageResponse['id']): Promise<TVillageResponse> => {
  const result = await axios.get<TResponseData<TVillageResponse>>(
    `${versionApi.VERSION_V1}/master-data/villages/${id}`,
  );
  return result.data.data;
};

export const createVillage = async (data: TVillageForm): Promise<TVillageResponse> => {
  const result = await axios.post<TResponseData<TVillageResponse>>(
    `${versionApi.VERSION_V1}/master-data/villages`,
    data,
  );
  return result.data.data;
};

export const updateVillage = async (params: TUpdateVillageParams): Promise<TVillageResponse> => {
  const result = await axios.patch<TResponseData<TVillageResponse>>(
    `${versionApi.VERSION_V1}/master-data/villages/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteVillage = async (id: TVillageResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/villages/${id}`);
  return result.data.data;
};
