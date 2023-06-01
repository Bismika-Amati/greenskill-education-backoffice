import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TExistingAlternativeResponse,
  TExistingAlternativeForm,
  TUpdateExistingAlternativeParams,
  TExistingAlternativesParams,
} from './entities';
import axios from '@/utils/axios';

export const fetchExistingAlternatives = async (
  params: TExistingAlternativesParams,
): Promise<TPaginateResponse<TExistingAlternativeResponse>> => {
  const result = await axios.get<TPaginateResponse<TExistingAlternativeResponse>>(
    `${versionApi.VERSION_V1}/master-data/existing-alternatives`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchExistingAlternativeDetails = async (
  id: TExistingAlternativeResponse['id'],
): Promise<TExistingAlternativeResponse> => {
  const result = await axios.get<TResponseData<TExistingAlternativeResponse>>(
    `${versionApi.VERSION_V1}/master-data/existing-alternatives/${id}`,
  );
  return result.data.data;
};

export const createExistingAlternative = async (
  data: TExistingAlternativeForm,
): Promise<TExistingAlternativeResponse> => {
  const result = await axios.post<TResponseData<TExistingAlternativeResponse>>(
    `${versionApi.VERSION_V1}/master-data/existing-alternatives`,
    data,
  );
  return result.data.data;
};

export const updateExistingAlternative = async (
  params: TUpdateExistingAlternativeParams,
): Promise<TExistingAlternativeResponse> => {
  const result = await axios.patch<TResponseData<TExistingAlternativeResponse>>(
    `${versionApi.VERSION_V1}/master-data/existing-alternatives/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteExistingAlternative = async (id: TExistingAlternativeResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/existing-alternatives/${id}`,
  );
  return result.data.data;
};
