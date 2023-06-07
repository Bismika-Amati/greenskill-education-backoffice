import { useCreateUserCourse, useDeleteUserCourse, useUpdateUserCourse } from './hooks';
import { Form } from 'antd';
import { TUserCourseForm, TUserCourseResponse } from './entities';
import { TPageProps } from '@/modules/commons/entities';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const useUserCourseForm = (id?: TPageProps['params']['id']) => {
  const ID = id ?? '';

  const [form] = Form.useForm<TUserCourseForm>();
  const watchForm = Form.useWatch<TUserCourseForm | undefined>([], form);

  const createMutation = useCreateUserCourse();
  const onCreate = (values: TUserCourseForm) => {
    resetErrorForm(form);

    return new Promise<TUserCourseResponse>((resolve, reject) => {
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

  const updateMutation = useUpdateUserCourse();
  const onUpdate = (values: TUserCourseForm) => {
    resetErrorForm(form);

    return new Promise<TUserCourseResponse>((resolve, reject) => {
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

  const deleteMutation = useDeleteUserCourse();
  const onDelete = (id: TUserCourseResponse['id']) => {
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
