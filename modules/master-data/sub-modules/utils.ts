import { useState } from 'react';
import { useCreateSubModule, useDeleteSubModule, useFetchSubModules, useUpdateSubModule } from './hooks';
import { Form, SelectProps } from 'antd';
import { TSubModuleForm, TSubModuleResponse, TSubModulesParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionSubModules = (
  params?: TSubModulesParams,
  config?: UseQueryOptions<TPaginateResponse<TSubModuleResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const subModuleDataHook = useFetchSubModules(
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
    subModuleOptions: {
      options,
      search,
      setSearch,
    },
    subModuleOptionDataHook: subModuleDataHook,
  };
};

export const useSubModuleForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TSubModuleForm>();
  const watchForm = Form.useWatch<TSubModuleForm | undefined>([], form);

  const setForm = (values?: TSubModuleForm) => {
    form.setFieldsValue({
      number: values?.number || 0,
      title: values?.title || '',
      courseId: values?.courseId || '',
      description: values?.description || '',
      video: values?.video || '',
      picture: values?.picture || '',
    });
  };

  const createMutation = useCreateSubModule();
  const onCreate = (values: TSubModuleForm) => {
    resetErrorForm(form);

    return new Promise<TSubModuleResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateSubModule();
  const onUpdate = (values: TSubModuleForm) => {
    resetErrorForm(form);

    return new Promise<TSubModuleResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteSubModule();
  const onDelete = (id: TSubModuleResponse['id']) => {
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
