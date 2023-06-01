import { useState } from 'react';
import {
  useCreateIntervieweeCharacteristic,
  useDeleteIntervieweeCharacteristic,
  useFetchIntervieweeCharacteristics,
  useUpdateIntervieweeCharacteristic,
} from './hooks';
import { Form, SelectProps } from 'antd';
import {
  TIntervieweeCharacteristicForm,
  TIntervieweeCharacteristicResponse,
  TIntervieweeCharacteristicsParams,
} from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionIntervieweeCharacteristics = (
  params?: TIntervieweeCharacteristicsParams,
  config?: UseQueryOptions<TPaginateResponse<TIntervieweeCharacteristicResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const intervieweeCharacteristicDataHook = useFetchIntervieweeCharacteristics(
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
    intervieweeCharacteristicOptions: {
      options,
      search,
      setSearch,
    },
    intervieweeCharacteristicOptionDataHook: intervieweeCharacteristicDataHook,
  };
};

export const useIntervieweeCharacteristicForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TIntervieweeCharacteristicForm>();

  const createMutation = useCreateIntervieweeCharacteristic();
  const onCreate = (values: TIntervieweeCharacteristicForm) => {
    resetErrorForm(form);

    return new Promise<TIntervieweeCharacteristicResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateIntervieweeCharacteristic();
  const onUpdate = (values: TIntervieweeCharacteristicForm) => {
    resetErrorForm(form);

    return new Promise<TIntervieweeCharacteristicResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteIntervieweeCharacteristic();
  const onDelete = (id: TIntervieweeCharacteristicResponse['id']) => {
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
