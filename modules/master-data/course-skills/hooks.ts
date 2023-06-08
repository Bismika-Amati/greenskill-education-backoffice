import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TCourseSkillForm, TCourseSkillResponse, TCourseSkillsParams, TUpdateCourseSkillParams } from './entities';
import {
  createCourseSkill,
  deleteCourseSkill,
  fetchCourseSkillDetails,
  fetchCourseSkills,
  updateCourseSkill,
} from './apis';

export const useFetchCourseSkills = (
  params: TCourseSkillsParams,
  options?: UseQueryOptions<TPaginateResponse<TCourseSkillResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TCourseSkillResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-courseskills', params],
    queryFn: () => fetchCourseSkills(params),
    ...options,
  });
};

export const useFetchCourseSkillDetails = (
  id: string,
  options?: UseQueryOptions<TCourseSkillResponse, TResponseError>,
): UseQueryResult<TCourseSkillResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-courseskill-details', id],
    queryFn: () => fetchCourseSkillDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateCourseSkill = (): UseMutationResult<TCourseSkillResponse, TResponseError, TCourseSkillForm> => {
  return useMutation(createCourseSkill);
};

export const useUpdateCourseSkill = (): UseMutationResult<
  TCourseSkillResponse,
  TResponseError,
  TUpdateCourseSkillParams
> => {
  return useMutation(updateCourseSkill);
};

export const useDeleteCourseSkill = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteCourseSkill);
};
