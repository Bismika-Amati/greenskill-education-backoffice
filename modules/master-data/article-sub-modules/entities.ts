import { TPaginateParams } from '@/modules/commons/entities';

export type TArticleSubModuleResponse = {
  id: string;
  number: number;
  title: string;
  description: string;
  video: string;
  picture: string;
  subModuleId: string;
};

export type TArticleSubModulesParams = TPaginateParams & {
  subModuleId?: string;
};

export type TArticleSubModuleForm = {
  number: number;
  title: string;
  description: string;
  video: string;
  picture: string;
  subModuleId: string;
};

export type TUpdateArticleSubModuleParams = {
  id: TArticleSubModuleResponse['id'];
  data: TArticleSubModuleForm;
};
