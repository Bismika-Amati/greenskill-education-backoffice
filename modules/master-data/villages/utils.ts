import { useState } from 'react';
import { useFetchVillages } from './hooks';
import { SelectProps } from 'antd';
import { TVillageResponse, TVillagesParams } from './entities';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';

export const useOptionVillages = (
  params?: TVillagesParams,
  config?: UseQueryOptions<TPaginateResponse<TVillageResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const villageDataHook = useFetchVillages(
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
    villageOptions: {
      options,
      search,
      setSearch,
    },
    villageOptionDataHook: villageDataHook,
  };
};
