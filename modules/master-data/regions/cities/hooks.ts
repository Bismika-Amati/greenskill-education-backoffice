import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { createCity, deleteCity, fetchCities, fetchCityDetails, updateCity } from './apis';
import { TCityForm, TCityResponse, TUpdateCityParams } from './entities';

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

export const useFetchCityDetails = (
  id: string,
  options?: UseQueryOptions<TCityResponse, TResponseError>,
): UseQueryResult<TCityResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-city-details', id],
    queryFn: () => fetchCityDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateCity = (): UseMutationResult<TCityResponse, TResponseError, TCityForm> => {
  return useMutation(createCity);
};

export const useUpdateCity = (): UseMutationResult<TCityResponse, TResponseError, TUpdateCityParams> => {
  return useMutation(updateCity);
};

export const useDeleteCity = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteCity);
};
