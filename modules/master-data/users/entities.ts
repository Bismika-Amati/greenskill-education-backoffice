import { TPaginateParams } from '@/modules/commons/entities';
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
  phoneNumber: string;
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

export type TUsersParams = TPaginateParams;

export type TUserForm = {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  subDistrictId: string;
  postcode: string;
  address: string;
};

export type TUpdateUserParams = {
  id: TUserResponse['id'];
  data: TUserForm;
};
