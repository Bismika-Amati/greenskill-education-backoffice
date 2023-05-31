import { TResponseError } from '@/modules/commons/entities';
import { FormInstance } from 'antd';

export const resetErrorForm = <T extends object>(form: FormInstance<T>) => {
  form.setFields(
    Object.keys(form.getFieldsValue()).map((item) => ({
      name: item,
      errors: [],
    })),
  );
};

export const setErrorForm = <T extends object>(form: FormInstance<T>, errors: TResponseError['message']) => {
  form.setFields(
    errors.map((item) => ({
      name: item.field,
      errors: item.error,
    })),
  );
};
