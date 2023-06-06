import { useState } from 'react';
import { useCreateVillage, useDeleteVillage, useFetchVillages, useUpdateVillage } from './hooks';
import { Form, SelectProps } from 'antd';
import { TVillageForm, TVillageResponse, TVillagesParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';

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

export const useVillageForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TVillageForm>();
  const watchForm = Form.useWatch<TVillageForm | undefined>([], form);

  const createMutation = useCreateVillage();
  const onCreate = (values: TVillageForm) => {
    resetErrorForm(form);

    return new Promise<TVillageResponse>((resolve, reject) => {
      createMutation.mutate(values, {
        onSuccess: (data) => {
          successNotification();
          resolve(data);
        },
        onError: (data) => {
          failedNotification();
          setErrorForm(form, data.message);
          reject(data);
        },
      });
    });
  };

  const updateMutation = useUpdateVillage();
  const onUpdate = (values: TVillageForm) => {
    resetErrorForm(form);

    return new Promise<TVillageResponse>((resolve, reject) => {
      updateMutation.mutate(
        { id: ID, data: values },
        {
          onSuccess: (data) => {
            successNotification();
            resolve(data);
          },
          onError: (data) => {
            failedNotification();
            setErrorForm(form, data.message);
            reject(data);
          },
        },
      );
    });
  };

  const deleteMutation = useDeleteVillage();
  const onDelete = (id: TVillageResponse['id']) => {
    return new Promise((resolve, reject) => {
      deleteMutation.mutate(id, {
        onSuccess: (data) => {
          successNotification();
          resolve(data);
        },
        onError: (data) => {
          failedNotification();
          reject(data);
        },
      });
    });
  };

  return {
    form,
    watchForm,
    onCreate,
    onUpdate,
    onDelete,
  };
};
