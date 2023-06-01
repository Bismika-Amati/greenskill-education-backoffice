import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TProblemStatementResponse,
  TProblemStatementForm,
  TUpdateProblemStatementParams,
  TProblemStatementsParams,
} from './entities';
import axios from '@/utils/axios';

export const fetchProblemStatements = async (
  params: TProblemStatementsParams,
): Promise<TPaginateResponse<TProblemStatementResponse>> => {
  const result = await axios.get<TPaginateResponse<TProblemStatementResponse>>(
    `${versionApi.VERSION_V1}/master-data/problem-statements`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchProblemStatementDetails = async (
  id: TProblemStatementResponse['id'],
): Promise<TProblemStatementResponse> => {
  const result = await axios.get<TResponseData<TProblemStatementResponse>>(
    `${versionApi.VERSION_V1}/master-data/problem-statements/${id}`,
  );
  return result.data.data;
};

export const createProblemStatement = async (data: TProblemStatementForm): Promise<TProblemStatementResponse> => {
  const result = await axios.post<TResponseData<TProblemStatementResponse>>(
    `${versionApi.VERSION_V1}/master-data/problem-statements`,
    data,
  );
  return result.data.data;
};

export const updateProblemStatement = async (
  params: TUpdateProblemStatementParams,
): Promise<TProblemStatementResponse> => {
  const result = await axios.patch<TResponseData<TProblemStatementResponse>>(
    `${versionApi.VERSION_V1}/master-data/problem-statements/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteProblemStatement = async (id: TProblemStatementResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/problem-statements/${id}`,
  );
  return result.data.data;
};
