import { TPaginateParams } from '@/modules/commons/entities';
import { TVillageResponse } from '../villages/entities';

export type TProblemStatementResponse = {
  id: string;
  topic: string;
  description: string;
  village: TVillageResponse;
};

export type TProblemStatementsParams = TPaginateParams & {
  villageId?: string;
};

export type TProblemStatementForm = {
  topic: string;
  description: string;
  villageId: string;
};

export type TUpdateProblemStatementParams = {
  id: TProblemStatementResponse['id'];
  data: TProblemStatementForm;
};
