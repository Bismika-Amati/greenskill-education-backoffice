import { useState } from 'react';
import { useFetchSubDistricts } from './hooks';
import { SelectProps } from 'antd';
import { TSubDistrictResponse, TSubDistrictsParams } from './entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';

export const useOptionSubDistricts = (
  params?: TSubDistrictsParams,
  config?: UseQueryOptions<TPaginateResponse<TSubDistrictResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const subDistrictDataHook = useFetchSubDistricts(
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
    subDistrictOptions: {
      options,
      search,
      setSearch,
    },
    subDistrictOptionDataHook: subDistrictDataHook,
  };
};
