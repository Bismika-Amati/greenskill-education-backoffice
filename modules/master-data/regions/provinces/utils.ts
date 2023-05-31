import { useState } from 'react';
import { useFetchProvinces } from './hooks';
import { SelectProps } from 'antd';

export const useOptionProvinces = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const provinceDataHook = useFetchProvinces(
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
    provinceOptions: {
      options,
      search,
      setSearch,
    },
    provinceOptionDataHook: provinceDataHook,
  };
};
