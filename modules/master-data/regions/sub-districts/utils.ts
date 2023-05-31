import { useState } from 'react';
import { useFetchSubDistricts } from './hooks';
import { SelectProps } from 'antd';
import { TSubDistrictsParams } from './entities';

export const useOptionSubDistricts = (params?: TSubDistrictsParams) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const subDistrictDataHook = useFetchSubDistricts(
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
    subDistrictOptions: {
      options,
      search,
      setSearch,
    },
    subDistrictOptionDataHook: subDistrictDataHook,
  };
};
