import { TPaginateParams } from '@/modules/commons/entities';
import { TCourseResponse } from '../courses/entities';

export type TSubModuleResponse = {
  id: string;
  number: number;
  title: string;
  description: string;
  video: string;
  picture: string;
  courseId: string;
  course: TCourseResponse;
};

export type TSubModulesParams = TPaginateParams & {
  courseId?: string;
};

export type TSubModuleForm = {
  number: number;
  title: string;
  description: string;
  video: string;
  picture: string;
  courseId: string;
};

export type TUpdateSubModuleParams = {
  id: TSubModuleResponse['id'];
  data: TSubModuleForm;
};
