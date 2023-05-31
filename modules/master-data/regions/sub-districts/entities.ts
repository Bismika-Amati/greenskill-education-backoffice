import { TDistrictResponse } from '../districts/entities';

export type TSubDistrictResponse = {
  id: string;
  name: string;
  district: TDistrictResponse;
};

export type TSubDistrictForm = {
  name: string;
  districtId: string;
};

export type TUpdateSubDistrictParams = {
  id: TSubDistrictResponse['id'];
  data: TSubDistrictForm;
};
