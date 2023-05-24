import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { fetchCities } from './api';
import { TCityResponse } from './entities';

export const useFetchCities = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TCityResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TCityResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-cities', params],
    queryFn: () => fetchCities(params),
    ...options,
  });
};
