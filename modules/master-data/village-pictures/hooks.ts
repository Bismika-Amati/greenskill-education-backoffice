import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  TVillagePictureForm,
  TVillagePictureResponse,
  TUpdateVillagePictureParams,
  TVillagePicturesParams,
} from './entities';
import {
  createVillagePicture,
  deleteVillagePicture,
  fetchVillagePictureDetails,
  fetchVillagePictures,
  updateVillagePicture,
} from './apis';

export const useFetchVillagePictures = (
  params: TVillagePicturesParams,
  options?: UseQueryOptions<TPaginateResponse<TVillagePictureResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TVillagePictureResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-villagepictures', params],
    queryFn: () => fetchVillagePictures(params),
    ...options,
  });
};

export const useFetchVillagePictureDetails = (
  id: string,
  options?: UseQueryOptions<TVillagePictureResponse, TResponseError>,
): UseQueryResult<TVillagePictureResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-villagepicture-details', id],
    queryFn: () => fetchVillagePictureDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateVillagePicture = (): UseMutationResult<
  TVillagePictureResponse,
  TResponseError,
  TVillagePictureForm
> => {
  return useMutation(createVillagePicture);
};

export const useUpdateVillagePicture = (): UseMutationResult<
  TVillagePictureResponse,
  TResponseError,
  TUpdateVillagePictureParams
> => {
  return useMutation(updateVillagePicture);
};

export const useDeleteVillagePicture = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteVillagePicture);
};
