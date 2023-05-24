import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TProvinceForm, TProvinceResponse, TUpdateProvinceParams } from './entities';
import { createProvince, deleteProvince, fetchProvinceDetails, fetchProvinces, updateProvince } from './apis';

export const useFetchProvinces = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TProvinceResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TProvinceResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-provinces', params],
    queryFn: () => fetchProvinces(params),
    ...options,
  });
};

export const useFetchProvinceDetails = (
  id: string,
  options?: UseQueryOptions<TProvinceResponse, TResponseError>,
): UseQueryResult<TProvinceResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-province-details', id],
    queryFn: () => fetchProvinceDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateProvince = (): UseMutationResult<TProvinceResponse, TResponseError, TProvinceForm> => {
  return useMutation(createProvince);
};

export const useUpdateProvince = (): UseMutationResult<TProvinceResponse, TResponseError, TUpdateProvinceParams> => {
  return useMutation(updateProvince);
};

export const useDeleteProvince = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteProvince);
};
