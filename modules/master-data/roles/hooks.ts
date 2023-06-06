import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TRoleForm, TRoleResponse, TRolesParams, TUpdateRoleParams } from './entities';
import { createRole, deleteRole, fetchRoleDetails, fetchRoles, updateRole } from './apis';

export const useFetchRoles = (
  params: TRolesParams,
  options?: UseQueryOptions<TPaginateResponse<TRoleResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TRoleResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-roles', params],
    queryFn: () => fetchRoles(params),
    ...options,
  });
};

export const useFetchRoleDetails = (
  id: string,
  options?: UseQueryOptions<TRoleResponse, TResponseError>,
): UseQueryResult<TRoleResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-role-details', id],
    queryFn: () => fetchRoleDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateRole = (): UseMutationResult<TRoleResponse, TResponseError, TRoleForm> => {
  return useMutation(createRole);
};

export const useUpdateRole = (): UseMutationResult<TRoleResponse, TResponseError, TUpdateRoleParams> => {
  return useMutation(updateRole);
};

export const useDeleteRole = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteRole);
};
