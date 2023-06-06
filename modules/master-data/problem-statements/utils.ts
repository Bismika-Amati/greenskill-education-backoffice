import { useState } from 'react';
import {
  useCreateProblemStatement,
  useDeleteProblemStatement,
  useFetchProblemStatements,
  useUpdateProblemStatement,
} from './hooks';
import { Form, SelectProps } from 'antd';
import { TProblemStatementForm, TProblemStatementResponse, TProblemStatementsParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionProblemStatements = (
  params?: TProblemStatementsParams,
  config?: UseQueryOptions<TPaginateResponse<TProblemStatementResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const problemStatementDataHook = useFetchProblemStatements(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: item.topic,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    problemStatementOptions: {
      options,
      search,
      setSearch,
    },
    problemStatementOptionDataHook: problemStatementDataHook,
  };
};

export const useProblemStatementForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TProblemStatementForm>();
  const watchForm = Form.useWatch<TProblemStatementForm | undefined>([], form);

  const createMutation = useCreateProblemStatement();
  const onCreate = (values: TProblemStatementForm) => {
    resetErrorForm(form);

    return new Promise<TProblemStatementResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateProblemStatement();
  const onUpdate = (values: TProblemStatementForm) => {
    resetErrorForm(form);

    return new Promise<TProblemStatementResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteProblemStatement();
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
