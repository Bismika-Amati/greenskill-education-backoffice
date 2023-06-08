import { useState } from 'react';
import { useCreateCourse, useDeleteCourse, useFetchCourses, useUpdateCourse } from './hooks';
import { Form, SelectProps } from 'antd';
import { TCourseForm, TCourseResponse, TCoursesParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useOptionCourses = (
  params?: TCoursesParams,
  config?: UseQueryOptions<TPaginateResponse<TCourseResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const courseDataHook = useFetchCourses(
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
    courseOptions: {
      options,
      search,
      setSearch,
    },
    courseOptionDataHook: courseDataHook,
  };
};

export const useCourseForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TCourseForm>();
  const watchForm = Form.useWatch<TCourseForm | undefined>([], form);

  const createMutation = useCreateCourse();
  const onCreate = (values: TCourseForm) => {
    resetErrorForm(form);

    return new Promise<TCourseResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateCourse();
  const onUpdate = (values: TCourseForm) => {
    resetErrorForm(form);

    return new Promise<TCourseResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteCourse();
  const onDelete = (id: TCourseResponse['id']) => {
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
