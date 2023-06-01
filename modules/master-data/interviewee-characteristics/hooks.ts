import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  createIntervieweeCharacteristic,
  deleteIntervieweeCharacteristic,
  fetchIntervieweeCharacteristics,
  fetchIntervieweeCharacteristicDetails,
  updateIntervieweeCharacteristic,
} from './apis';
import {
  TIntervieweeCharacteristicForm,
  TIntervieweeCharacteristicResponse,
  TUpdateIntervieweeCharacteristicParams,
} from './entities';

export const useFetchIntervieweeCharacteristics = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TIntervieweeCharacteristicResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TIntervieweeCharacteristicResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-intervieweecharacteristics', params],
    queryFn: () => fetchIntervieweeCharacteristics(params),
    ...options,
  });
};

export const useFetchIntervieweeCharacteristicDetails = (
  id: string,
  options?: UseQueryOptions<TIntervieweeCharacteristicResponse, TResponseError>,
): UseQueryResult<TIntervieweeCharacteristicResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-intervieweecharacteristic-details', id],
    queryFn: () => fetchIntervieweeCharacteristicDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateIntervieweeCharacteristic = (): UseMutationResult<
  TIntervieweeCharacteristicResponse,
  TResponseError,
  TIntervieweeCharacteristicForm
> => {
  return useMutation(createIntervieweeCharacteristic);
};

export const useUpdateIntervieweeCharacteristic = (): UseMutationResult<
  TIntervieweeCharacteristicResponse,
  TResponseError,
  TUpdateIntervieweeCharacteristicParams
> => {
  return useMutation(updateIntervieweeCharacteristic);
};

export const useDeleteIntervieweeCharacteristic = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteIntervieweeCharacteristic);
};
