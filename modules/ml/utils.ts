import { Form } from 'antd';
import { TPredictProblemForm, TPredictProblemResponse } from './entities';
import { usePredictProblem } from './hooks';
import { resetErrorForm } from '@/utils/helpers/form';
import { failedNotification, successNotification } from '@/utils/helpers/alert';

export const usePredictProblemForm = () => {
  const [form] = Form.useForm<TPredictProblemForm>();

  const predictProblemMutation = usePredictProblem();
  const onPredictProblem = (values: TPredictProblemForm) => {
    resetErrorForm(form);

    return new Promise<TPredictProblemResponse>((resolve, reject) => {
      predictProblemMutation.mutate(values, {
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
    predictProblemMutation,
    onPredictProblem,
  };
};
