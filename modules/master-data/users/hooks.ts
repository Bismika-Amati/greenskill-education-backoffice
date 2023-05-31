import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TUserForm, TUserResponse, TUpdateUserParams } from './entities';
import { createUser, deleteUser, fetchUserDetails, fetchUsers, updateUser } from './apis';

export const useFetchUsers = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TUserResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TUserResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-users', params],
    queryFn: () => fetchUsers(params),
    ...options,
  });
};

export const useFetchUserDetails = (
  id: string,
  options?: UseQueryOptions<TUserResponse, TResponseError>,
): UseQueryResult<TUserResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-user-details', id],
    queryFn: () => fetchUserDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateUser = (): UseMutationResult<TUserResponse, TResponseError, TUserForm> => {
  return useMutation(createUser);
};

export const useUpdateUser = (): UseMutationResult<TUserResponse, TResponseError, TUpdateUserParams> => {
  return useMutation(updateUser);
};

export const useDeleteUser = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteUser);
};
