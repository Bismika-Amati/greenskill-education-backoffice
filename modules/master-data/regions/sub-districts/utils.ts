import { useState } from 'react';
import { useFetchSubDistricts } from './hooks';
import { SelectProps } from 'antd';

export const useOptionSubDistricts = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const subDistrictDataHook = useFetchSubDistricts(
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
    subDistrictOptions: {
      options,
      search,
      setSearch,
    },
    subDistrictOptionDataHook: subDistrictDataHook,
  };
};
