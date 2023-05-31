import { TCityResponse } from '../cities/entities';

export type TDistrictResponse = {
  id: string;
  name: string;
  city: TCityResponse;
};

export type TDistrictForm = {
  name: string;
  cityID: string;
};

export type TUpdateDistrictParams = {
  id: TDistrictResponse['id'];
  data: TDistrictForm;
};
