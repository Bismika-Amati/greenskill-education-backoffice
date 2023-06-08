import { useState } from 'react';
import { useCreateUser, useDeleteUser, useFetchUsers, useUpdateUser } from './hooks';
import { Form, SelectProps } from 'antd';
import { TUserForm, TUserResponse, TUsersParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';

export const useOptionUsers = (
  params?: TUsersParams,
  config?: UseQueryOptions<TPaginateResponse<TUserResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const userDataHook = useFetchUsers(
    { ...params, search: search || params?.search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: `${item.fullname} - ${item.email}`,
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

export const useUserForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TUserForm>();
  const watchForm = Form.useWatch<TUserForm | undefined>([], form);

  const createMutation = useCreateUser();
  const onCreate = (values: TUserForm) => {
    resetErrorForm(form);

    if (!values.photo) values.photo = '';

    return new Promise<TUserResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateUser();
  const onUpdate = (values: TUserForm) => {
    resetErrorForm(form);

    if (!values.photo) values.photo = '';

    return new Promise<TUserResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteUser();
  const onDelete = (id: TUserResponse['id']) => {
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
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
