import { TCityResponse } from '../regions/cities/entities';
import { TDistrictResponse } from '../regions/districts/entities';
import { TProvinceResponse } from '../regions/provinces/entities';
import { TSubDistrictResponse } from '../regions/sub-districts/entities';
import { TRoleResponse } from '../roles/entities';

export type TUserResponse = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phoneNumber: number;
  photo: string;
  role: TRoleResponse;
  province: TProvinceResponse;
  city: TCityResponse;
  district: TDistrictResponse;
  subDistrict: TSubDistrictResponse;
  postcode: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
