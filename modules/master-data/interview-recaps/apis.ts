import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TInterviewRecapResponse,
  TInterviewRecapForm,
  TUpdateInterviewRecapParams,
  TInterviewRecapsParams,
} from './entities';
import axios from '@/utils/axios';

export const fetchInterviewRecaps = async (
  params: TInterviewRecapsParams,
): Promise<TPaginateResponse<TInterviewRecapResponse>> => {
  const result = await axios.get<TPaginateResponse<TInterviewRecapResponse>>(
    `${versionApi.VERSION_V1}/master-data/interview-recaps`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchInterviewRecapDetails = async (
  id: TInterviewRecapResponse['id'],
): Promise<TInterviewRecapResponse> => {
  const result = await axios.get<TResponseData<TInterviewRecapResponse>>(
    `${versionApi.VERSION_V1}/master-data/interview-recaps/${id}`,
  );
  return result.data.data;
};

export const createInterviewRecap = async (data: TInterviewRecapForm): Promise<TInterviewRecapResponse> => {
  const result = await axios.post<TResponseData<TInterviewRecapResponse>>(
    `${versionApi.VERSION_V1}/master-data/interview-recaps`,
    data,
  );
  return result.data.data;
};

export const updateInterviewRecap = async (params: TUpdateInterviewRecapParams): Promise<TInterviewRecapResponse> => {
  const result = await axios.patch<TResponseData<TInterviewRecapResponse>>(
    `${versionApi.VERSION_V1}/master-data/interview-recaps/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteInterviewRecap = async (id: TInterviewRecapResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/interview-recaps/${id}`,
  );
  return result.data.data;
};
