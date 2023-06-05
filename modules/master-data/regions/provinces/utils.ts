import { useState } from 'react';
import { useFetchProvinces } from './hooks';
import { SelectProps } from 'antd';
import { TProvinceResponse, TProvincesParams } from './entities';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';

export const useOptionProvinces = (
  params?: TProvincesParams,
  config?: UseQueryOptions<TPaginateResponse<TProvinceResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const provinceDataHook = useFetchProvinces(
    { ...params, search: search || params?.search },
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
    provinceOptions: {
      options,
      search,
      setSearch,
    },
    provinceOptionDataHook: provinceDataHook,
  };
};
