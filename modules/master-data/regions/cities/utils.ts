import { useState } from 'react';
import { useFetchCities } from './hooks';
import { SelectProps } from 'antd';
import { TCitiesParams } from './entities';

export const useOptionCities = (params?: TCitiesParams) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const cityDataHook = useFetchCities(
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
