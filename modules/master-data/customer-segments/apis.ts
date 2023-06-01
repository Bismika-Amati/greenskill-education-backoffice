import { versionApi } from '@/modules/commons/constants';
import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TCustomerSegmentResponse,
  TCustomerSegmentForm,
  TUpdateCustomerSegmentParams,
  TCustomerSegmentsParams,
} from './entities';
import axios from '@/utils/axios';

export const fetchCustomerSegments = async (
  params: TCustomerSegmentsParams,
): Promise<TPaginateResponse<TCustomerSegmentResponse>> => {
  const result = await axios.get<TPaginateResponse<TCustomerSegmentResponse>>(
    `${versionApi.VERSION_V1}/master-data/customer-segments`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchCustomerSegmentDetails = async (
  id: TCustomerSegmentResponse['id'],
): Promise<TCustomerSegmentResponse> => {
  const result = await axios.get<TResponseData<TCustomerSegmentResponse>>(
    `${versionApi.VERSION_V1}/master-data/customer-segments/${id}`,
  );
  return result.data.data;
};

export const createCustomerSegment = async (data: TCustomerSegmentForm): Promise<TCustomerSegmentResponse> => {
  const result = await axios.post<TResponseData<TCustomerSegmentResponse>>(
    `${versionApi.VERSION_V1}/master-data/customer-segments`,
    data,
  );
  return result.data.data;
};

export const updateCustomerSegment = async (
  params: TUpdateCustomerSegmentParams,
): Promise<TCustomerSegmentResponse> => {
  const result = await axios.patch<TResponseData<TCustomerSegmentResponse>>(
    `${versionApi.VERSION_V1}/master-data/customer-segments/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteCustomerSegment = async (id: TCustomerSegmentResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/customer-segments/${id}`,
  );
  return result.data.data;
};
