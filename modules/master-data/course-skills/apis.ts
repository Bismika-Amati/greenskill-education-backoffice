import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import { TCourseSkillForm, TCourseSkillResponse, TCourseSkillsParams, TUpdateCourseSkillParams } from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchCourseSkills = async (
  params: TCourseSkillsParams,
): Promise<TPaginateResponse<TCourseSkillResponse>> => {
  const result = await axios.get<TPaginateResponse<TCourseSkillResponse>>(
    `${versionApi.VERSION_V1}/master-data/course-skills`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchCourseSkillDetails = async (id: TCourseSkillResponse['id']): Promise<TCourseSkillResponse> => {
  const result = await axios.get<TResponseData<TCourseSkillResponse>>(
    `${versionApi.VERSION_V1}/master-data/course-skills/${id}`,
  );
  return result.data.data;
};

export const createCourseSkill = async (data: TCourseSkillForm): Promise<TCourseSkillResponse> => {
  const result = await axios.post<TResponseData<TCourseSkillResponse>>(
    `${versionApi.VERSION_V1}/master-data/course-skills`,
    data,
  );
  return result.data.data;
};

export const updateCourseSkill = async (params: TUpdateCourseSkillParams): Promise<TCourseSkillResponse> => {
  const result = await axios.patch<TResponseData<TCourseSkillResponse>>(
    `${versionApi.VERSION_V1}/master-data/course-skills/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteCourseSkill = async (id: TCourseSkillResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(`${versionApi.VERSION_V1}/master-data/course-skills/${id}`);
  return result.data.data;
};
