import { TPaginateParams } from '@/modules/commons/entities';
import { TProblemStatementResponse } from '../problem-statements/entities';

export type TEarlyAdopterResponse = {
  id: string;
  title: string;
  description: string;
  problemStatement: TProblemStatementResponse;
};

export type TEarlyAdoptersParams = TPaginateParams & {
  problemStatementId?: string;
};

export type TEarlyAdopterForm = {
  title: string;
  description: string;
  problemStatementId: string;
};

export type TUpdateEarlyAdopterParams = {
  id: TEarlyAdopterResponse['id'];
  data: TEarlyAdopterForm;
};
