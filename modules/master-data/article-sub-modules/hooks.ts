import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  TArticleSubModuleForm,
  TArticleSubModuleResponse,
  TArticleSubModulesParams,
  TUpdateArticleSubModuleParams,
} from './entities';
import {
  createArticleSubModule,
  deleteArticleSubModule,
  fetchArticleSubModuleDetails,
  fetchArticleSubModules,
  updateArticleSubModule,
} from './apis';

export const useFetchArticleSubModules = (
  params: TArticleSubModulesParams,
  options?: UseQueryOptions<TPaginateResponse<TArticleSubModuleResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TArticleSubModuleResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-articlesubmodules', params],
    queryFn: () => fetchArticleSubModules(params),
    ...options,
  });
};

export const useFetchArticleSubModuleDetails = (
  id: string,
  options?: UseQueryOptions<TArticleSubModuleResponse, TResponseError>,
): UseQueryResult<TArticleSubModuleResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-articlesubmodule-details', id],
    queryFn: () => fetchArticleSubModuleDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateArticleSubModule = (): UseMutationResult<
  TArticleSubModuleResponse,
  TResponseError,
  TArticleSubModuleForm
> => {
  return useMutation(createArticleSubModule);
};

export const useUpdateArticleSubModule = (): UseMutationResult<
  TArticleSubModuleResponse,
  TResponseError,
  TUpdateArticleSubModuleParams
> => {
  return useMutation(updateArticleSubModule);
};

export const useDeleteArticleSubModule = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteArticleSubModule);
};
