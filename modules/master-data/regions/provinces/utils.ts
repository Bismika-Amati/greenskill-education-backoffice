import { useState } from 'react';
import { useFetchProvinces } from './hooks';
import { SelectProps } from 'antd';
import { TProvincesParams } from './entities';

export const useOptionProvinces = (params?: TProvincesParams) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const provinceDataHook = useFetchProvinces(
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
    provinceOptions: {
      options,
      search,
      setSearch,
    },
    provinceOptionDataHook: provinceDataHook,
  };
};
