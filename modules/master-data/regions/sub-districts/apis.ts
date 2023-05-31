import { versionApi } from '@/modules/commons/constants';
import { TPaginateParams, TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import axios from '@/utils/axios';
import { TSubDistrictResponse, TSubDistrictForm, TUpdateSubDistrictParams } from './entities';

export const fetchCities = async (
  params: TPaginateParams & { provinceId?: string },
): Promise<TPaginateResponse<TSubDistrictResponse>> => {
  const result = await axios.get<TPaginateResponse<TSubDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/sub-districts`,
    { params },
  );
  return result.data;
};

export const fetchSubDistrictDetails = async (id: TSubDistrictResponse['id']): Promise<TSubDistrictResponse> => {
  const result = await axios.get<TResponseData<TSubDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/sub-districts/${id}`,
  );
  return result.data.data;
};

export const createSubDistrict = async (data: TSubDistrictForm): Promise<TSubDistrictResponse> => {
  const result = await axios.post<TResponseData<TSubDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/sub-districts`,
    data,
  );
  return result.data.data;
};

export const updateSubDistrict = async (params: TUpdateSubDistrictParams): Promise<TSubDistrictResponse> => {
  const result = await axios.patch<TResponseData<TSubDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/sub-districts/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteSubDistrict = async (id: TSubDistrictResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/regions/sub-districts/${id}`,
  );
  return result.data.data;
};
