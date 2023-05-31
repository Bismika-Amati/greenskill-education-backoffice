import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { fetchDistricts } from './api';
import { TDistrictResponse } from './entities';

export const useFetchDistricts = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TDistrictResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TDistrictResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-districts', params],
    queryFn: () => fetchDistricts(params),
    ...options,
  });
};
