import { TPaginateParams } from '@/modules/commons/entities';
import { TInterviewRecapResponse } from '../interview-recaps/entities';

export type TIntervieweeCharacteristicResponse = {
  id: string;
  title: string;
  description: string;
  interviewRecap: TInterviewRecapResponse;
};

export type TIntervieweeCharacteristicsParams = TPaginateParams & {
  interviewRecapId?: string;
};

export type TIntervieweeCharacteristicForm = {
  title: string;
  description: string;
  interviewRecapId?: string;
};

export type TUpdateIntervieweeCharacteristicParams = {
  id: TIntervieweeCharacteristicResponse['id'];
  data: TIntervieweeCharacteristicForm;
};
