import { versionApi } from '@/modules/commons/constants';
import { TPaginateParams, TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TCityResponse, TCityForm, TUpdateCityParams } from './entities';
import axios from '@/utils/axios';

export const fetchCities = async (
  params: TPaginateParams & { provinceId?: string },
): Promise<TPaginateResponse<TCityResponse>> => {
  const result = await axios.get<TPaginateResponse<TCityResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/cities`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchCityDetails = async (id: TCityResponse['id']): Promise<TCityResponse> => {
  const result = await axios.get<TResponseData<TCityResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/cities/${id}`,
  );
  return result.data.data;
};

export const createCity = async (data: TCityForm): Promise<TCityResponse> => {
  const result = await axios.post<TResponseData<TCityResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/cities`,
    data,
  );
  return result.data.data;
};

export const updateCity = async (params: TUpdateCityParams): Promise<TCityResponse> => {
  const result = await axios.patch<TResponseData<TCityResponse>>(
    `${versionApi.VERSION_V1}/master-data/regions/cities/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteCity = async (id: TCityResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/regions/cities/${id}`);
  return result.data.data;
};
