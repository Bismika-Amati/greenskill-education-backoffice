import { useState } from 'react';
import { useFetchDistricts } from './hooks';
import { SelectProps } from 'antd';
import { TDistrictsParams } from './entities';

export const useOptionDistricts = (params?: TDistrictsParams) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const districtDataHook = useFetchDistricts(
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
    districtOptions: {
      options,
      search,
      setSearch,
    },
    districtOptionDataHook: districtDataHook,
  };
};
