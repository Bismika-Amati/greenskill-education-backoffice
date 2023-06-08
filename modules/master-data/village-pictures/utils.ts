import { useState } from 'react';
import {
  useCreateVillagePicture,
  useDeleteVillagePicture,
  useFetchVillagePictures,
  useUpdateVillagePicture,
} from './hooks';
import { Form, SelectProps } from 'antd';
import { TVillagePictureForm, TVillagePictureResponse, TVillagePicturesParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionVillagePictures = (
  params?: TVillagePicturesParams,
  config?: UseQueryOptions<TPaginateResponse<TVillagePictureResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const villagePictureDataHook = useFetchVillagePictures(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: item.photo,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    villagePictureOptions: {
      options,
      search,
      setSearch,
    },
    villagePictureOptionDataHook: villagePictureDataHook,
  };
};

export const useVillagePictureForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TVillagePictureForm>();
  const watchForm = Form.useWatch<TVillagePictureForm | undefined>([], form);

  const createMutation = useCreateVillagePicture();
  const onCreate = (values: TVillagePictureForm) => {
    resetErrorForm(form);

    return new Promise<TVillagePictureResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateVillagePicture();
  const onUpdate = (values: TVillagePictureForm) => {
    resetErrorForm(form);

    return new Promise<TVillagePictureResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteVillagePicture();
  const onDelete = (id: TVillagePictureResponse['id']) => {
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
