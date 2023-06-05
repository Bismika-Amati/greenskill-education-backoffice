import { TPaginateParams } from '@/modules/commons/entities';
import { TProvinceResponse } from '../regions/provinces/entities';
import { TSubDistrictResponse } from '../regions/sub-districts/entities';
import { TDistrictResponse } from '../regions/districts/entities';
import { TCityResponse } from '../regions/cities/entities';

export type TVillageResponse = {
  address: string;
  cityId: string;
  city: TCityResponse;
  createdAt: string;
  deletedAt: string;
  description: string;
  districtId: string;
  district: TDistrictResponse;
  id: string;
  latlong: string;
  name: string;
  picId: string;
  postcode: string;
  provinceId: string;
  province: TProvinceResponse;
  subDistrictId: string;
  subDistrict: TSubDistrictResponse;
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
