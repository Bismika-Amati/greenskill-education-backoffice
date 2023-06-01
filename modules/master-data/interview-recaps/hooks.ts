import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  createInterviewRecap,
  deleteInterviewRecap,
  fetchInterviewRecaps,
  fetchInterviewRecapDetails,
  updateInterviewRecap,
} from './apis';
import { TInterviewRecapForm, TInterviewRecapResponse, TUpdateInterviewRecapParams } from './entities';

export const useFetchInterviewRecaps = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TInterviewRecapResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TInterviewRecapResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-interviewrecaps', params],
    queryFn: () => fetchInterviewRecaps(params),
    ...options,
  });
};

export const useFetchInterviewRecapDetails = (
  id: string,
  options?: UseQueryOptions<TInterviewRecapResponse, TResponseError>,
): UseQueryResult<TInterviewRecapResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-interviewrecap-details', id],
    queryFn: () => fetchInterviewRecapDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateInterviewRecap = (): UseMutationResult<
  TInterviewRecapResponse,
  TResponseError,
  TInterviewRecapForm
> => {
  return useMutation(createInterviewRecap);
};

export const useUpdateInterviewRecap = (): UseMutationResult<
  TInterviewRecapResponse,
  TResponseError,
  TUpdateInterviewRecapParams
> => {
  return useMutation(updateInterviewRecap);
};

export const useDeleteInterviewRecap = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteInterviewRecap);
};
