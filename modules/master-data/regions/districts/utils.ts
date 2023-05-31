import { useState } from 'react';
import { useFetchDistricts } from './hooks';
import { SelectProps } from 'antd';
import { TDistrictResponse, TDistrictsParams } from './entities';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';

export const useOptionDistricts = (
  params?: TDistrictsParams,
  config?: UseQueryOptions<TPaginateResponse<TDistrictResponse>, TResponseError>,
) => {
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
      ...config,
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
