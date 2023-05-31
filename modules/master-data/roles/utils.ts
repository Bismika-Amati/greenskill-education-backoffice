import { useState } from 'react';
import { useFetchRoles } from './hooks';
import { SelectProps } from 'antd';

export const useOptionRoles = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const roleDataHook = useFetchRoles(
    { search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      },
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
