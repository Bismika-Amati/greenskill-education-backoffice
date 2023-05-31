import { useState } from 'react';
import { useFetchUsers } from './hooks';
import { SelectProps } from 'antd';

export const useOptionUsers = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const userDataHook = useFetchUsers(
    { search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: `${item.fullname} - ${item.email}`,
            value: item.id,
          })),
        );
      },
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
