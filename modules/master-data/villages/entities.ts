export type TVillageResponse = {
  id: string;
  name: string;
  description: string;
};

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
