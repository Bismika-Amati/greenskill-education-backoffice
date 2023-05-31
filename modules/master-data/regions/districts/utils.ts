import { useState } from 'react';
import { useFetchDistricts } from './hooks';
import { SelectProps } from 'antd';

export const useOptionDistricts = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const districtDataHook = useFetchDistricts(
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
    districtOptions: {
      options,
      search,
      setSearch,
    },
    districtOptionDataHook: districtDataHook,
  };
};
