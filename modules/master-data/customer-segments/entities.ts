import { TPaginateParams } from '@/modules/commons/entities';
import { TProblemStatementResponse } from '../problem-statements/entities';

export type TCustomerSegmentResponse = {
  id: string;
  title: string;
  description: string;
  problemStatement: TProblemStatementResponse;
};

export type TCustomerSegmentsParams = TPaginateParams & {
  problemStatementId?: string;
};

export type TCustomerSegmentForm = {
  title: string;
  description: string;
  problemStatementId: string;
};

export type TUpdateCustomerSegmentParams = {
  id: TCustomerSegmentResponse['id'];
  data: TCustomerSegmentForm;
};
