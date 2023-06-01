import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TIntervieweeCharacteristicResponse,
  TIntervieweeCharacteristicForm,
  TUpdateIntervieweeCharacteristicParams,
  TIntervieweeCharacteristicsParams,
} from './entities';
import axios from '@/utils/axios';

export const fetchIntervieweeCharacteristics = async (
  params: TIntervieweeCharacteristicsParams,
): Promise<TPaginateResponse<TIntervieweeCharacteristicResponse>> => {
  const result = await axios.get<TPaginateResponse<TIntervieweeCharacteristicResponse>>(
    `${versionApi.VERSION_V1}/master-data/interviewee-characteristics`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchIntervieweeCharacteristicDetails = async (
  id: TIntervieweeCharacteristicResponse['id'],
): Promise<TIntervieweeCharacteristicResponse> => {
  const result = await axios.get<TResponseData<TIntervieweeCharacteristicResponse>>(
    `${versionApi.VERSION_V1}/master-data/interviewee-characteristics/${id}`,
  );
  return result.data.data;
};

export const createIntervieweeCharacteristic = async (
  data: TIntervieweeCharacteristicForm,
): Promise<TIntervieweeCharacteristicResponse> => {
  const result = await axios.post<TResponseData<TIntervieweeCharacteristicResponse>>(
    `${versionApi.VERSION_V1}/master-data/interviewee-characteristics`,
    data,
  );
  return result.data.data;
};

export const updateIntervieweeCharacteristic = async (
  params: TUpdateIntervieweeCharacteristicParams,
): Promise<TIntervieweeCharacteristicResponse> => {
  const result = await axios.patch<TResponseData<TIntervieweeCharacteristicResponse>>(
    `${versionApi.VERSION_V1}/master-data/interviewee-characteristics/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteIntervieweeCharacteristic = async (
  id: TIntervieweeCharacteristicResponse['id'],
): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/interviewee-characteristics/${id}`,
  );
  return result.data.data;
};
