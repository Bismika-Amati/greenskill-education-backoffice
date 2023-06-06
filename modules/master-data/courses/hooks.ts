import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { TCourseForm, TCourseResponse, TCoursesParams, TUpdateCourseParams } from './entities';
import { createCourse, deleteCourse, fetchCourseDetails, fetchCourses, updateCourse } from './apis';

export const useFetchCourses = (
  params: TCoursesParams,
  options?: UseQueryOptions<TPaginateResponse<TCourseResponse>, TResponseError>,
): UseQueryResult<TPaginateResponse<TCourseResponse>, TResponseError> => {
  return useQuery({
    queryKey: ['fetch-masterdata-courses', params],
    queryFn: () => fetchCourses(params),
    ...options,
  });
};

export const useFetchCourseDetails = (
  id: string,
  options?: UseQueryOptions<TCourseResponse, TResponseError>,
): UseQueryResult<TCourseResponse> => {
  return useQuery({
    queryKey: ['fetch-masterdata-course-details', id],
    queryFn: () => fetchCourseDetails(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateCourse = (): UseMutationResult<TCourseResponse, TResponseError, TCourseForm> => {
  return useMutation(createCourse);
};

export const useUpdateCourse = (): UseMutationResult<TCourseResponse, TResponseError, TUpdateCourseParams> => {
  return useMutation(updateCourse);
};

export const useDeleteCourse = (): UseMutationResult<string, TResponseError, string> => {
  return useMutation(deleteCourse);
};
