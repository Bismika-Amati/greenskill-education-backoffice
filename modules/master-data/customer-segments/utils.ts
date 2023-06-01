import { useState } from 'react';
import {
  useCreateCustomerSegment,
  useDeleteCustomerSegment,
  useFetchCustomerSegments,
  useUpdateCustomerSegment,
} from './hooks';
import { Form, SelectProps } from 'antd';
import { TCustomerSegmentForm, TCustomerSegmentResponse, TCustomerSegmentsParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { TProblemStatementResponse } from '../problem-statements/entities';

export const useOptionCustomerSegments = (
  params?: TCustomerSegmentsParams,
  config?: UseQueryOptions<TPaginateResponse<TCustomerSegmentResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const userDataHook = useFetchCustomerSegments(
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
    userOptions: {
      options,
      search,
      setSearch,
    },
    userOptionDataHook: userDataHook,
  };
};

export const useCustomerSegmentForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TCustomerSegmentForm>();

  const createMutation = useCreateCustomerSegment();
  const onCreate = (values: TCustomerSegmentForm) => {
    resetErrorForm(form);

    return new Promise<TCustomerSegmentResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateCustomerSegment();
  const onUpdate = (values: TCustomerSegmentForm) => {
    resetErrorForm(form);

    return new Promise<TCustomerSegmentResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteCustomerSegment();
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
