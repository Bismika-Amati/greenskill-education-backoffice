import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TSubModuleForm, TSubModuleResponse, TSubModulesParams, TUpdateSubModuleParams } from './entities';
import { createSubModule, deleteSubModule, fetchSubModuleDetails, fetchSubModules, updateSubModule } from './apis';

export const useFetchSubModules = (
  params: TSubModulesParams,
  options?: UseQueryOptions<TPaginateResponse<TSubModuleResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TSubModuleResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-submodules', params],
    queryFn: () => fetchSubModules(params),
    ...options,
  });
};

export const useFetchSubModuleDetails = (
  id: string,
  options?: UseQueryOptions<TSubModuleResponse, TResponseError>,
): UseQueryResult<TSubModuleResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-submodule-details', id],
    queryFn: () => fetchSubModuleDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateSubModule = (): UseMutationResult<TSubModuleResponse, TResponseError, TSubModuleForm> => {
  return useMutation(createSubModule);
};

export const useUpdateSubModule = (): UseMutationResult<TSubModuleResponse, TResponseError, TUpdateSubModuleParams> => {
  return useMutation(updateSubModule);
};

export const useDeleteSubModule = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteSubModule);
};
