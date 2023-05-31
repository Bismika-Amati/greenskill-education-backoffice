import { useState } from 'react';
import { useFetchCities } from './hooks';
import { SelectProps } from 'antd';
import { TCitiesParams, TCityResponse } from './entities';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';

export const useOptionCities = (
  params?: TCitiesParams,
  config?: UseQueryOptions<TPaginateResponse<TCityResponse>, TResponseError>,
) => {
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
      ...config,
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
