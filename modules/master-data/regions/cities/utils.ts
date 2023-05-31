import { useState } from 'react';
import { useFetchCities } from './hooks';
import { SelectProps } from 'antd';

export const useOptionCities = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const cityDataHook = useFetchCities(
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
    cityOptions: {
      options,
      search,
      setSearch,
    },
    cityOptionDataHook: cityDataHook,
  };
};
