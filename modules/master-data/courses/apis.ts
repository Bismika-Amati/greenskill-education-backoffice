import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TCourseForm, TCourseResponse, TCoursesParams, TUpdateCourseParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchCourses = async (params: TCoursesParams): Promise<TPaginateResponse<TCourseResponse>> => {
  const result = await axios.get<TPaginateResponse<TCourseResponse>>(`${versionApi.VERSION_V1}/master-data/courses`, {
    params,
  });
  return result.data;
};

export const fetchCourseDetails = async (id: TCourseResponse['id']): Promise<TCourseResponse> => {
  const result = await axios.get<TResponseData<TCourseResponse>>(`${versionApi.VERSION_V1}/master-data/courses/${id}`);
  return result.data.data;
};

export const createCourse = async (data: TCourseForm): Promise<TCourseResponse> => {
  const result = await axios.post<TResponseData<TCourseResponse>>(`${versionApi.VERSION_V1}/master-data/courses`, data);
  return result.data.data;
};

export const updateCourse = async (params: TUpdateCourseParams): Promise<TCourseResponse> => {
  const result = await axios.patch<TResponseData<TCourseResponse>>(
    `${versionApi.VERSION_V1}/master-data/courses/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteCourse = async (id: TCourseResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/courses/${id}`);
  return result.data.data;
};
