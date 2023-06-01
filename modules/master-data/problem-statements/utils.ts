import { useState } from 'react';
import { useCreateProblemStatement, useFetchProblemStatements, useUpdateProblemStatement } from './hooks';
import { Form, SelectProps } from 'antd';
import { TProblemStatementForm, TProblemStatementResponse, TProblemStatementsParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const [form] = Form.useForm<TProblemStatementForm>();

  const createMutation = useCreateProblemStatement();
  const onCreate = (values: TProblemStatementForm) => {
    resetErrorForm(form);

    createMutation.mutate(values, {
      onSuccess: (data) => {
        router.push(`/dashboard/problem-statements/${data.id}`);
        successNotification();
      },
      onError: (data) => {
        failedNotification();
        setErrorForm(form, data.message);
      },
    });
  };

  const updateMutation = useUpdateProblemStatement();
  const onUpdate = (values: TProblemStatementForm) => {
    resetErrorForm(form);

    updateMutation.mutate(
      { id: ID, data: values },
      {
        onSuccess: () => {
          successNotification();
        },
        onError: (data) => {
          failedNotification();
          setErrorForm(form, data.message);
        },
      },
    );
  };

  return {
    form,
    onCreate,
    onUpdate,
  };
};
