import { TPaginateParams } from '@/modules/commons/entities';
import { TProvinceResponse } from '../provinces/entities';

export type TCityResponse = {
  id: string;
  name: string;
  province: TProvinceResponse;
};

export type TCitiesParams = TPaginateParams & {
  provinceId?: string;
};

export type TCityForm = {
  name: string;
  provinceId: string;
};

export type TUpdateCityParams = {
  id: TCityResponse['id'];
  data: TCityForm;
};
