import { TProvinceResponse } from '../provinces/entities';
import { TCityResponse } from '../cities/entities';

export type TDistrictResponse = {
  id: string;
  name: string;
  province: TProvinceResponse;
  city: TCityResponse;
};

export type TDistrictForm = {
  name: string;
  provinceId: string;
  cityID: string;
};

export type TUpdateDistrictParams = {
  id: TDistrictResponse['id'];
  data: TDistrictForm;
};
