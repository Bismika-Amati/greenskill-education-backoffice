import { TPaginateParams } from '@/modules/commons/entities';
import { TDistrictResponse } from '../districts/entities';

export type TSubDistrictResponse = {
  id: string;
  name: string;
  district: TDistrictResponse;
};

export type TSubDistrictsParams = TPaginateParams & {
  districtId?: string;
};

export type TSubDistrictForm = {
  name: string;
  districtId: string;
};

export type TUpdateSubDistrictParams = {
  id: TSubDistrictResponse['id'];
  data: TSubDistrictForm;
};
