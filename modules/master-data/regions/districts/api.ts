import { versionApi } from '@/modules/commons/constants';
import { TPaginateParams, TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TDistrictResponse, TDistrictForm, TUpdateDistrictParams } from './entities';
import axios from '@/utils/axios';

export const fetchDistricts = async (
  params: TPaginateParams & { provinceId?: string; cityID?: string },
): Promise<TPaginateResponse<TDistrictResponse>> => {
  const result = await axios.get<TPaginateResponse<TDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/districts`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchDistrictDetails = async (id: TDistrictResponse['id']): Promise<TDistrictResponse> => {
  const result = await axios.get<TResponseData<TDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/districts/${id}`,
  );
  return result.data.data;
};

export const createDistrict = async (data: TDistrictForm): Promise<TDistrictResponse> => {
  const result = await axios.post<TResponseData<TDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/districts`,
    data,
  );
  return result.data.data;
};

export const updateDistrict = async (params: TUpdateDistrictParams): Promise<TDistrictResponse> => {
  const result = await axios.patch<TResponseData<TDistrictResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/districts/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteDistrict = async (id: TDistrictResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/regions/districts/${id}`,
  );
  return result.data.data;
};
