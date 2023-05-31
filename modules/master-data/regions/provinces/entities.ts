import { TPaginateParams } from '@/modules/commons/entities';

export type TProvinceResponse = {
  id: string;
  name: string;
};

export type TProvincesParams = TPaginateParams;

export type TProvinceForm = {
  name: string;
};

export type TUpdateProvinceParams = {
  id: TProvinceResponse['id'];
  data: TProvinceForm;
};
