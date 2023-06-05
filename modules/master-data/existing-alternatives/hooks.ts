import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  createExistingAlternative,
  deleteExistingAlternative,
  fetchExistingAlternatives,
  fetchExistingAlternativeDetails,
  updateExistingAlternative,
} from './apis';
import {
  TExistingAlternativeForm,
  TExistingAlternativeResponse,
  TExistingAlternativesParams,
  TUpdateExistingAlternativeParams,
} from './entities';

export const useFetchExistingAlternatives = (
  params: TExistingAlternativesParams,
  options?: UseQueryOptions<TPaginateResponse<TExistingAlternativeResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TExistingAlternativeResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-existingalternatives', params],
    queryFn: () => fetchExistingAlternatives(params),
    ...options,
  });
};

export const useFetchExistingAlternativeDetails = (
  id: string,
  options?: UseQueryOptions<TExistingAlternativeResponse, TResponseError>,
): UseQueryResult<TExistingAlternativeResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-existingalternative-details', id],
    queryFn: () => fetchExistingAlternativeDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateExistingAlternative = (): UseMutationResult<
  TExistingAlternativeResponse,
  TResponseError,
  TExistingAlternativeForm
> => {
  return useMutation(createExistingAlternative);
};

export const useUpdateExistingAlternative = (): UseMutationResult<
  TExistingAlternativeResponse,
  TResponseError,
  TUpdateExistingAlternativeParams
> => {
  return useMutation(updateExistingAlternative);
};

export const useDeleteExistingAlternative = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteExistingAlternative);
};
