import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { createSubDistrict, deleteSubDistrict, fetchCities, fetchSubDistrictDetails, updateSubDistrict } from './apis';
import { TSubDistrictForm, TSubDistrictResponse, TUpdateSubDistrictParams } from './entities';

export const useFetchSubDistricts = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TSubDistrictResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TSubDistrictResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-subdistrict', params],
    queryFn: () => fetchCities(params),
    ...options,
  });
};

export const useFetchSubDistrictDetails = (
  id: string,
  options?: UseQueryOptions<TSubDistrictResponse, TResponseError>,
): UseQueryResult<TSubDistrictResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-subdistrict-details', id],
    queryFn: () => fetchSubDistrictDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateSubDistrict = (): UseMutationResult<TSubDistrictResponse, TResponseError, TSubDistrictForm> => {
  return useMutation(createSubDistrict);
};

export const useUpdateSubDistrict = (): UseMutationResult<
  TSubDistrictResponse,
  TResponseError,
  TUpdateSubDistrictParams
> => {
  return useMutation(updateSubDistrict);
};

export const useDeleteSubDistrict = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteSubDistrict);
};
