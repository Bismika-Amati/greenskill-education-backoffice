import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { createDistrict, deleteDistrict, fetchDistrictDetails, fetchDistricts, updateDistrict } from './apis';
import { TDistrictForm, TDistrictResponse, TUpdateDistrictParams } from './entities';

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

export const useFetchDistrictDetails = (
  id: string,
  options?: UseQueryOptions<TDistrictResponse, TResponseError>,
): UseQueryResult<TDistrictResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-city-details', id],
    queryFn: () => fetchDistrictDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateDistrict = (): UseMutationResult<TDistrictResponse, TResponseError, TDistrictForm> => {
  return useMutation(createDistrict);
};

export const useUpdateDistrict = (): UseMutationResult<TDistrictResponse, TResponseError, TUpdateDistrictParams> => {
  return useMutation(updateDistrict);
};

export const useDeleteDistrict = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteDistrict);
};
