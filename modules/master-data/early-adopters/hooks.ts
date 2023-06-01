import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  createEarlyAdopter,
  deleteEarlyAdopter,
  fetchEarlyAdopters,
  fetchEarlyAdopterDetails,
  updateEarlyAdopter,
} from './apis';
import { TEarlyAdopterForm, TEarlyAdopterResponse, TUpdateEarlyAdopterParams } from './entities';

export const useFetchEarlyAdopters = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TEarlyAdopterResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TEarlyAdopterResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-earlyadopters', params],
    queryFn: () => fetchEarlyAdopters(params),
    ...options,
  });
};

export const useFetchEarlyAdopterDetails = (
  id: string,
  options?: UseQueryOptions<TEarlyAdopterResponse, TResponseError>,
): UseQueryResult<TEarlyAdopterResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-earlyadopter-details', id],
    queryFn: () => fetchEarlyAdopterDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateEarlyAdopter = (): UseMutationResult<
  TEarlyAdopterResponse,
  TResponseError,
  TEarlyAdopterForm
> => {
  return useMutation(createEarlyAdopter);
};

export const useUpdateEarlyAdopter = (): UseMutationResult<
  TEarlyAdopterResponse,
  TResponseError,
  TUpdateEarlyAdopterParams
> => {
  return useMutation(updateEarlyAdopter);
};

export const useDeleteEarlyAdopter = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteEarlyAdopter);
};
