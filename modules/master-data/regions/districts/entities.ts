import { TPaginateParams } from '@/modules/commons/entities';
import { TCityResponse } from '../cities/entities';

export type TDistrictResponse = {
  id: string;
  name: string;
  city: TCityResponse;
};

export type TDistrictsParams = TPaginateParams & {
  cityId?: string;
};

export type TDistrictForm = {
  name: string;
  cityId: string;
};

export type TUpdateDistrictParams = {
  id: TDistrictResponse['id'];
  data: TDistrictForm;
};
