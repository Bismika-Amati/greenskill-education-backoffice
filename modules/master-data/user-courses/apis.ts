import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TUserCourseForm, TUserCourseResponse, TUserCoursesParams, TUpdateUserCourseParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchUserCourses = async (params: TUserCoursesParams): Promise<TPaginateResponse<TUserCourseResponse>> => {
  const result = await axios.get<TPaginateResponse<TUserCourseResponse>>(
    `${versionApi.VERSION_V1}/master-data/user-courses`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchUserCourseDetails = async (id: TUserCourseResponse['id']): Promise<TUserCourseResponse> => {
  const result = await axios.get<TResponseData<TUserCourseResponse>>(
    `${versionApi.VERSION_V1}/master-data/user-courses/${id}`,
  );
  return result.data.data;
};

export const createUserCourse = async (data: TUserCourseForm): Promise<TUserCourseResponse> => {
  const result = await axios.post<TResponseData<TUserCourseResponse>>(
    `${versionApi.VERSION_V1}/master-data/user-courses`,
    data,
  );
  return result.data.data;
};

export const updateUserCourse = async (params: TUpdateUserCourseParams): Promise<TUserCourseResponse> => {
  const result = await axios.patch<TResponseData<TUserCourseResponse>>(
    `${versionApi.VERSION_V1}/master-data/user-courses/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteUserCourse = async (id: TUserCourseResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/user-courses/${id}`);
  return result.data.data;
};
