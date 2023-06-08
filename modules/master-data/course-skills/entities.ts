import { TPaginateParams } from '@/modules/commons/entities';
import { TCourseResponse } from '../courses/entities';

export type TCourseSkillResponse = {
  id: string;
  name: string;
  description: string;
  courseId: string;
  course: TCourseResponse;
};

export type TCourseSkillsParams = TPaginateParams & {
  courseId?: string;
};

export type TCourseSkillForm = {
  name: string;
  description: string;
  courseId: string;
};

export type TUpdateCourseSkillParams = {
  id: TCourseSkillResponse['id'];
  data: TCourseSkillForm;
};
