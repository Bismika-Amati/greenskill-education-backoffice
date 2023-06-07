import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TUserCourseForm, TUserCourseResponse, TUserCoursesParams, TUpdateUserCourseParams } from './entities';
import { createUserCourse, deleteUserCourse, fetchUserCourseDetails, fetchUserCourses, updateUserCourse } from './apis';

export const useFetchUserCourses = (
  params: TUserCoursesParams,
  options?: UseQueryOptions<TPaginateResponse<TUserCourseResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TUserCourseResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-usercourses', params],
    queryFn: () => fetchUserCourses(params),
    ...options,
  });
};

export const useFetchUserCourseDetails = (
  id: string,
  options?: UseQueryOptions<TUserCourseResponse, TResponseError>,
): UseQueryResult<TUserCourseResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-usercourse-details', id],
    queryFn: () => fetchUserCourseDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateUserCourse = (): UseMutationResult<TUserCourseResponse, TResponseError, TUserCourseForm> => {
  return useMutation(createUserCourse);
};

export const useUpdateUserCourse = (): UseMutationResult<
  TUserCourseResponse,
  TResponseError,
  TUpdateUserCourseParams
> => {
  return useMutation(updateUserCourse);
};

export const useDeleteUserCourse = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteUserCourse);
};
