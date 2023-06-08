import { useState } from 'react';
import {
  useCreateArticleSubModule,
  useDeleteArticleSubModule,
  useFetchArticleSubModules,
  useUpdateArticleSubModule,
} from './hooks';
import { Form, SelectProps } from 'antd';
import { TArticleSubModuleForm, TArticleSubModuleResponse, TArticleSubModulesParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionArticleSubModules = (
  params?: TArticleSubModulesParams,
  config?: UseQueryOptions<TPaginateResponse<TArticleSubModuleResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const articleArticleSubModuleDataHook = useFetchArticleSubModules(
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
    articleArticleSubModuleOptions: {
      options,
      search,
      setSearch,
    },
    articleArticleSubModuleOptionDataHook: articleArticleSubModuleDataHook,
  };
};

export const useArticleSubModuleForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TArticleSubModuleForm>();
  const watchForm = Form.useWatch<TArticleSubModuleForm | undefined>([], form);

  const setForm = (values?: TArticleSubModuleForm) => {
    form.setFieldsValue({
      title: values?.title || '',
      subModuleId: values?.subModuleId || '',
      description: values?.description || '',
      video: values?.video || '',
      picture: values?.picture || '',
    });
  };

  const createMutation = useCreateArticleSubModule();
  const onCreate = (values: TArticleSubModuleForm) => {
    resetErrorForm(form);

    return new Promise<TArticleSubModuleResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateArticleSubModule();
  const onUpdate = (values: TArticleSubModuleForm) => {
    resetErrorForm(form);

    return new Promise<TArticleSubModuleResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteArticleSubModule();
  const onDelete = (id: TArticleSubModuleResponse['id']) => {
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
    setForm,
    onCreate,
    onUpdate,
    onDelete,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
