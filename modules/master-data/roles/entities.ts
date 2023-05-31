export type TRoleResponse = {
  id: string;
  name: string;
};

export type TRoleForm = {
  name: string;
};

export type TUpdateRoleParams = {
  id: TRoleResponse['id'];
  data: TRoleForm;
};
