import { useState } from 'react';
import { useFetchRoles } from './hooks';
import { SelectProps } from 'antd';
import { TRoleResponse, TRolesParams } from './entities';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';

export const useOptionRoles = (
  params?: TRolesParams,
  config?: UseQueryOptions<TPaginateResponse<TRoleResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const roleDataHook = useFetchRoles(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    roleOptions: {
      options,
      search,
      setSearch,
    },
    roleOptionDataHook: roleDataHook,
  };
};
