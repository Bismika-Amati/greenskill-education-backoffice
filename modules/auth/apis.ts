import axios from '@/utils/axios';
import { TAuthLoginForm, TAuthResponse } from './entities';
import { versionApi } from '../commons/constants';

export const authLogin = async (data: TAuthLoginForm): Promise<TAuthResponse> => {
  const result = await axios.post<TAuthResponse>(`${versionApi.VERSION_V1}/auth/login`, data);
  return result.data;
};
