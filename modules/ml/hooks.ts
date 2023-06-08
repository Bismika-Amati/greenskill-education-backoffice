import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { TPredictProblemForm, TPredictProblemResponse } from './entities';
import { TResponseError } from '../commons/entities';
import { predictProblem } from './apis';

export const usePredictProblem = (): UseMutationResult<
  TPredictProblemResponse,
  TResponseError,
  TPredictProblemForm
> => {
  return useMutation(predictProblem);
};
