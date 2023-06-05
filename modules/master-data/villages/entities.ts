import { TPaginateParams } from '@/modules/commons/entities';

export type TVillageResponse = {
  address: string;
  cityId: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  districtId: string;
  id: string;
  latlong: string;
  name: string;
  picId: string;
  postcode: string;
  provinceId: string;
  subDistrictId: string;
  updatedAt: string;
};

export type TVillagesParams = TPaginateParams;

export type TVillageForm = {
  name: string;
  description: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  subDistrictId: string;
  postcode: string;
  address: string;
  latlong: string;
  picId: string;
};

export type TUpdateVillageParams = {
  id: TVillageResponse['id'];
  data: TVillageForm;
};
