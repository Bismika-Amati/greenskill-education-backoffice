import { versionApi } from '@/modules/commons/constants';
import { TPaginateParams, TPaginateResponse } from '@/modules/commons/entities';
import { TCityResponse } from './entities';
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
