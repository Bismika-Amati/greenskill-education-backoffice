import { TPaginateParams } from '@/modules/commons/entities';
import { TProblemStatementResponse } from '../problem-statements/entities';

export type TInterviewRecapResponse = {
  id: string;
  intervieweeName: string;
  interviewDate: string;
  evidenceVideo: string;
  evidenceText: string;
  problemStatement: TProblemStatementResponse;
};

export type TInterviewRecapsParams = TPaginateParams & {
  problemStatementId?: string;
};

export type TInterviewRecapForm = {
  intervieweeName: string;
  interviewDate: Date;
  evidenceVideo: string;
  evidenceText: string;
  problemStatementId: string;
};

export type TUpdateInterviewRecapParams = {
  id: TInterviewRecapResponse['id'];
  data: TInterviewRecapForm;
};
