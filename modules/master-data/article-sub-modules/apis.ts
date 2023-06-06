import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TArticleSubModuleForm,
  TArticleSubModuleResponse,
  TArticleSubModulesParams,
  TUpdateArticleSubModuleParams,
} from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchArticleSubModules = async (
  params: TArticleSubModulesParams,
): Promise<TPaginateResponse<TArticleSubModuleResponse>> => {
  const result = await axios.get<TPaginateResponse<TArticleSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/article-sub-modules`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchArticleSubModuleDetails = async (
  id: TArticleSubModuleResponse['id'],
): Promise<TArticleSubModuleResponse> => {
  const result = await axios.get<TResponseData<TArticleSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/article-sub-modules/${id}`,
  );
  return result.data.data;
};

export const createArticleSubModule = async (data: TArticleSubModuleForm): Promise<TArticleSubModuleResponse> => {
  const result = await axios.post<TResponseData<TArticleSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/article-sub-modules`,
    data,
  );
  return result.data.data;
};

export const updateArticleSubModule = async (
  params: TUpdateArticleSubModuleParams,
): Promise<TArticleSubModuleResponse> => {
  const result = await axios.patch<TResponseData<TArticleSubModuleResponse>>(
    `${versionApi.VERSION_V1}/master-data/article-sub-modules/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteArticleSubModule = async (id: TArticleSubModuleResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/article-sub-modules/${id}`,
  );
  return result.data.data;
};
