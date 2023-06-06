import axios from '@/utils/axios';
import { versionApi } from '../commons/constants';
import { TResponseData } from '../commons/entities';
import { TMediaForm, TMediaResponse } from './entities';
import { AxiosRequestConfig } from 'axios';

export const uploadMedia = async (data: TMediaForm, config?: AxiosRequestConfig) => {
  const formdata = new FormData();
  formdata.append('file', data.file);
  formdata.append('filePlace', data.filePlace);

  const result = await axios.post<TResponseData<TMediaResponse>>(`${versionApi.VERSION_V1}/media`, data, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result;
};
