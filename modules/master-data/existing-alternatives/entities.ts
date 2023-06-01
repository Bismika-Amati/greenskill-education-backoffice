import { TPaginateParams } from '@/modules/commons/entities';
import { TProblemStatementResponse } from '../problem-statements/entities';

export type TExistingAlternativeResponse = {
  id: string;
  title: string;
  description: string;
  problemStatement: TProblemStatementResponse;
};

export type TExistingAlternativesParams = TPaginateParams & {
  problemStatementId?: string;
};

export type TExistingAlternativeForm = {
  title: string;
  description: string;
  problemStatementId: string;
};

export type TUpdateExistingAlternativeParams = {
  id: TExistingAlternativeResponse['id'];
  data: TExistingAlternativeForm;
};
