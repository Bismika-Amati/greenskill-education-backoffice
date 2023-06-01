import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  createCustomerSegment,
  deleteCustomerSegment,
  fetchCustomerSegments,
  fetchCustomerSegmentDetails,
  updateCustomerSegment,
} from './apis';
import { TCustomerSegmentForm, TCustomerSegmentResponse, TUpdateCustomerSegmentParams } from './entities';

export const useFetchCustomerSegments = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TCustomerSegmentResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TCustomerSegmentResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-customersegements', params],
    queryFn: () => fetchCustomerSegments(params),
    ...options,
  });
};

export const useFetchCustomerSegmentDetails = (
  id: string,
  options?: UseQueryOptions<TCustomerSegmentResponse, TResponseError>,
): UseQueryResult<TCustomerSegmentResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-customersegement-details', id],
    queryFn: () => fetchCustomerSegmentDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateCustomerSegment = (): UseMutationResult<
  TCustomerSegmentResponse,
  TResponseError,
  TCustomerSegmentForm
> => {
  return useMutation(createCustomerSegment);
};

export const useUpdateCustomerSegment = (): UseMutationResult<
  TCustomerSegmentResponse,
  TResponseError,
  TUpdateCustomerSegmentParams
> => {
  return useMutation(updateCustomerSegment);
};

export const useDeleteCustomerSegment = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteCustomerSegment);
};
