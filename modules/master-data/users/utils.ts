import { useState } from 'react';
import { useFetchUsers } from './hooks';
import { SelectProps } from 'antd';
import { TUserResponse, TUsersParams } from './entities';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';

export const useOptionUsers = (
  params?: TUsersParams,
  config?: UseQueryOptions<TPaginateResponse<TUserResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const userDataHook = useFetchUsers(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: `${item.fullname} - ${item.email}`,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    userOptions: {
      options,
      search,
      setSearch,
    },
    userOptionDataHook: userDataHook,
  };
};
