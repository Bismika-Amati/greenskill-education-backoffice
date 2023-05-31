import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TProvinceForm, TProvincesParams, TProvinceResponse, TUpdateProvinceParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchProvinces = async (params: TProvincesParams): Promise<TPaginateResponse<TProvinceResponse>> => {
  const result = await axios.get<TPaginateResponse<TProvinceResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/provinces`,
    { params },
  );
  return result.data;
};

export const fetchProvinceDetails = async (id: TProvinceResponse['id']): Promise<TProvinceResponse> => {
  const result = await axios.get<TResponseData<TProvinceResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/provinces/${id}`,
  );
  return result.data.data;
};

export const createProvince = async (data: TProvinceForm): Promise<TProvinceResponse> => {
  const result = await axios.post<TResponseData<TProvinceResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/provinces`,
    data,
  );
  return result.data.data;
};

export const updateProvince = async (params: TUpdateProvinceParams): Promise<TProvinceResponse> => {
  const result = await axios.patch<TResponseData<TProvinceResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/provinces/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteProvince = async (id: TProvinceResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/regions/provinces/${id}`,
  );
  return result.data.data;
};
