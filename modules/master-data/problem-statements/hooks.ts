import { TPaginateParams, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  createProblemStatement,
  deleteProblemStatement,
  fetchProblemStatements,
  fetchProblemStatementDetails,
  updateProblemStatement,
} from './apis';
import { TProblemStatementForm, TProblemStatementResponse, TUpdateProblemStatementParams } from './entities';

export const useFetchProblemStatements = (
  params: TPaginateParams,
  options?: UseQueryOptions<TPaginateResponse<TProblemStatementResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TProblemStatementResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-problemstatement', params],
    queryFn: () => fetchProblemStatements(params),
    ...options,
  });
};

export const useFetchProblemStatementDetails = (
  id: string,
  options?: UseQueryOptions<TProblemStatementResponse, TResponseError>,
): UseQueryResult<TProblemStatementResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-problemstatement-details', id],
    queryFn: () => fetchProblemStatementDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateProblemStatement = (): UseMutationResult<
  TProblemStatementResponse,
  TResponseError,
  TProblemStatementForm
> => {
  return useMutation(createProblemStatement);
};

export const useUpdateProblemStatement = (): UseMutationResult<
  TProblemStatementResponse,
  TResponseError,
  TUpdateProblemStatementParams
> => {
  return useMutation(updateProblemStatement);
};

export const useDeleteProblemStatement = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteProblemStatement);
};
