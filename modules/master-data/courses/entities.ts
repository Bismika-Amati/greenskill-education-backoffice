import { TPaginateParams } from '@/modules/commons/entities';

export type TCourseResponse = {
  id: string;
  title: string;
  description: string;
  photo: string;
  amount: number;
  estimateCompleated: number;
};

export type TCoursesParams = TPaginateParams;

export type TCourseForm = {
  title: string;
  description: string;
  photo: string;
  amount: number;
  estimateCompleated: number;
};

export type TUpdateCourseParams = {
  id: TCourseResponse['id'];
  data: TCourseForm;
};
