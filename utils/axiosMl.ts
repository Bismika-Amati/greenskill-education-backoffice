import Axios, { AxiosError, AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

const axiosMl = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ML_URL,
});

axiosMl.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.headers['content-type'] === 'application/json; charset=utf-8') {
      response.data = camelizeKeys(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.data && error.response?.headers['content-type'] === 'application/json; charset=utf-8') {
      error.response.data = camelizeKeys(error.response.data);
    }
    throw error.response?.data;
  },
);

axiosMl.interceptors.request.use(async (config) => {
  const newConfig = { ...config };

  if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;
  if (config.params) {
    newConfig.params = camelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = camelizeKeys(config.data);
  }
  return newConfig;
});

export default axiosMl;
