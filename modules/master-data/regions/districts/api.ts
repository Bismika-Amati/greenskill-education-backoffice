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
