import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { createVillage, deleteVillage, fetchVillages, fetchVillageDetails, updateVillage } from './apis';
import { TVillageForm, TVillageResponse, TUpdateVillageParams } from './entities';

export const useFetchVillages = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TVillageResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TVillageResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-villages', params],
    queryFn: () => fetchVillages(params),
    ...options,
  });
};

export const useFetchVillageDetails = (
  id: string,
  options?: UseQueryOptions<TVillageResponse, TResponseError>,
): UseQueryResult<TVillageResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-city-details', id],
    queryFn: () => fetchVillageDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateVillage = (): UseMutationResult<TVillageResponse, TResponseError, TVillageForm> => {
  return useMutation(createVillage);
};

export const useUpdateVillage = (): UseMutationResult<TVillageResponse, TResponseError, TUpdateVillageParams> => {
  return useMutation(updateVillage);
};

export const useDeleteVillage = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteVillage);
};
