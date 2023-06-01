import { useState } from 'react';
import { useCreateEarlyAdopter, useDeleteEarlyAdopter, useFetchEarlyAdopters, useUpdateEarlyAdopter } from './hooks';
import { Form, SelectProps } from 'antd';
import { TEarlyAdopterForm, TEarlyAdopterResponse, TEarlyAdoptersParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { TProblemStatementResponse } from '../problem-statements/entities';

export const useOptionEarlyAdopters = (
  params?: TEarlyAdoptersParams,
  config?: UseQueryOptions<TPaginateResponse<TEarlyAdopterResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const earlyAdopterDataHook = useFetchEarlyAdopters(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: item.title,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    earlyAdopterOptions: {
      options,
      search,
      setSearch,
    },
    earlyAdopterOptionDataHook: earlyAdopterDataHook,
  };
};

export const useEarlyAdopterForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TEarlyAdopterForm>();

  const createMutation = useCreateEarlyAdopter();
  const onCreate = (values: TEarlyAdopterForm) => {
    resetErrorForm(form);

    return new Promise<TEarlyAdopterResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateEarlyAdopter();
  const onUpdate = (values: TEarlyAdopterForm) => {
    resetErrorForm(form);

    return new Promise<TEarlyAdopterResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteEarlyAdopter();
  const onDelete = (id: TProblemStatementResponse['id']) => {
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
    onCreate,
    onUpdate,
    onDelete,
  };
};
