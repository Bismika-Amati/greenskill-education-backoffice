import { useState } from 'react';
import {
  useCreateInterviewRecap,
  useDeleteInterviewRecap,
  useFetchInterviewRecaps,
  useUpdateInterviewRecap,
} from './hooks';
import { Form, SelectProps } from 'antd';
import { TInterviewRecapForm, TInterviewRecapResponse, TInterviewRecapsParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionInterviewRecaps = (
  params?: TInterviewRecapsParams,
  config?: UseQueryOptions<TPaginateResponse<TInterviewRecapResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const interviewRecapDataHook = useFetchInterviewRecaps(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: `${item.intervieweeName} - ${item.interviewDate}`,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    interviewRecapOptions: {
      options,
      search,
      setSearch,
    },
    interviewRecapOptionDataHook: interviewRecapDataHook,
  };
};

export const useInterviewRecapForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TInterviewRecapForm>();
  const watchForm = Form.useWatch<TInterviewRecapForm | undefined>([], form);

  const createMutation = useCreateInterviewRecap();
  const onCreate = (values: TInterviewRecapForm) => {
    resetErrorForm(form);

    return new Promise<TInterviewRecapResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateInterviewRecap();
  const onUpdate = (values: TInterviewRecapForm) => {
    resetErrorForm(form);

    return new Promise<TInterviewRecapResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteInterviewRecap();
  const onDelete = (id: TInterviewRecapResponse['id']) => {
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
