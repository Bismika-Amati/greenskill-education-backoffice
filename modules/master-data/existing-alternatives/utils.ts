import { useState } from 'react';
import {
  useCreateExistingAlternative,
  useDeleteExistingAlternative,
  useFetchExistingAlternatives,
  useUpdateExistingAlternative,
} from './hooks';
import { Form, SelectProps } from 'antd';
import { TExistingAlternativeForm, TExistingAlternativeResponse, TExistingAlternativesParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { TProblemStatementResponse } from '../problem-statements/entities';

export const useOptionExistingAlternatives = (
  params?: TExistingAlternativesParams,
  config?: UseQueryOptions<TPaginateResponse<TExistingAlternativeResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const existingAlternativeDataHook = useFetchExistingAlternatives(
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
    existingAlternativeOptions: {
      options,
      search,
      setSearch,
    },
    existingAlternativeOptionDataHook: existingAlternativeDataHook,
  };
};

export const useExistingAlternativeForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TExistingAlternativeForm>();
  const watchForm = Form.useWatch<TExistingAlternativeForm | undefined>([], form);

  const createMutation = useCreateExistingAlternative();
  const onCreate = (values: TExistingAlternativeForm) => {
    resetErrorForm(form);

    return new Promise<TExistingAlternativeResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateExistingAlternative();
  const onUpdate = (values: TExistingAlternativeForm) => {
    resetErrorForm(form);

    return new Promise<TExistingAlternativeResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteExistingAlternative();
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
    watchForm,
    onCreate,
    onUpdate,
    onDelete,
  };
};
