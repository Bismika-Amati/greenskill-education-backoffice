import axiosMl from '@/utils/axiosMl';
import { TPredictProblemForm, TPredictProblemResponse } from './entities';

export const predictProblem = async (data: TPredictProblemForm): Promise<TPredictProblemResponse> => {
  const result = await axiosMl.post<TPredictProblemResponse>(`/predict`, data);
  return result.data;
};
