import { TPaginateParams } from '@/modules/commons/entities';

export type TRoleResponse = {
  id: string;
  name: string;
};

export type TRolesParams = TPaginateParams & {
  roleId?: string;
};

export type TRoleForm = {
  name: string;
};

export type TUpdateRoleParams = {
  id: TRoleResponse['id'];
  data: TRoleForm;
};
