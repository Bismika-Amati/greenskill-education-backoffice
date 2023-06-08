import { useState } from 'react';
import { useCreateCourseSkill, useDeleteCourseSkill, useFetchCourseSkills, useUpdateCourseSkill } from './hooks';
import { Form, SelectProps } from 'antd';
import { TCourseSkillForm, TCourseSkillResponse, TCourseSkillsParams } from './entities';
import { TPageProps, TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { UseQueryOptions } from '@tanstack/react-query';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { TProblemStatementResponse } from '../problem-statements/entities';

export const useOptionCourseSkills = (
  params?: TCourseSkillsParams,
  config?: UseQueryOptions<TPaginateResponse<TCourseSkillResponse>, TResponseError>,
) => {
  const [search, setSearch] = useState(params?.search ?? '');
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const courseSkillDataHook = useFetchCourseSkills(
    { ...params, search },
    {
      onSuccess: (data) => {
        setOptions(
          data.data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      },
      ...config,
    },
  );

  return {
    courseSkillOptions: {
      options,
      search,
      setSearch,
    },
    courseSkillOptionDataHook: courseSkillDataHook,
  };
};

export const useCourseSkillForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TCourseSkillForm>();
  const watchForm = Form.useWatch<TCourseSkillForm | undefined>([], form);

  const createMutation = useCreateCourseSkill();
  const onCreate = (values: TCourseSkillForm) => {
    resetErrorForm(form);

    return new Promise<TCourseSkillResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateCourseSkill();
  const onUpdate = (values: TCourseSkillForm) => {
    resetErrorForm(form);

    return new Promise<TCourseSkillResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteCourseSkill();
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
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
