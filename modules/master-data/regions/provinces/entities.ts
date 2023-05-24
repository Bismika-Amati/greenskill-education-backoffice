export type TProvinceResponse = {
  id: string;
  name: string;
};

export type TProvinceForm = {
  name: string;
};

export type TUpdateProvinceParams = {
  id: TProvinceResponse['id'];
  data: TProvinceForm;
};
