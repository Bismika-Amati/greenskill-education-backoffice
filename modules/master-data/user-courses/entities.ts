import { TPaginateParams } from '@/modules/commons/entities';
import { TUserResponse } from '../users/entities';
import { TCourseResponse } from '../courses/entities';

export type TUserCourseResponse = {
  id: string;
  feedback: string;
  rating: number;
  experience: string;
  userId: string;
  user: TUserResponse;
  courseId: string;
  course: TCourseResponse;
};

export type TUserCoursesParams = TPaginateParams;

export type TUserCourseForm = {
  feedback: string;
  rating: number;
  experience: string;
  userId: string;
  courseId: string;
};

export type TUpdateUserCourseParams = {
  id: TUserCourseResponse['id'];
  data: TUserCourseForm;
};
