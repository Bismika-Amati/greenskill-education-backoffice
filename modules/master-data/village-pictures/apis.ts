import { TPaginateResponse, TResponseData } from '@/modules/commons/entities';
import {
  TVillagePictureForm,
  TVillagePictureResponse,
  TVillagePicturesParams,
  TUpdateVillagePictureParams,
} from './entities';
import { versionApi } from '@/modules/commons/constants';
import axios from '@/utils/axios';

export const fetchVillagePictures = async (
  params: TVillagePicturesParams,
): Promise<TPaginateResponse<TVillagePictureResponse>> => {
  const result = await axios.get<TPaginateResponse<TVillagePictureResponse>>(
    `${versionApi.VERSION_V1}/master-data/village-pictures`,
    {
      params,
    },
  );
  return result.data;
};

export const fetchVillagePictureDetails = async (
  id: TVillagePictureResponse['id'],
): Promise<TVillagePictureResponse> => {
  const result = await axios.get<TResponseData<TVillagePictureResponse>>(
    `${versionApi.VERSION_V1}/master-data/village-pictures/${id}`,
  );
  return result.data.data;
};

export const createVillagePicture = async (data: TVillagePictureForm): Promise<TVillagePictureResponse> => {
  const result = await axios.post<TResponseData<TVillagePictureResponse>>(
    `${versionApi.VERSION_V1}/master-data/village-pictures`,
    data,
  );
  return result.data.data;
};

export const updateVillagePicture = async (params: TUpdateVillagePictureParams): Promise<TVillagePictureResponse> => {
  const result = await axios.patch<TResponseData<TVillagePictureResponse>>(
    `${versionApi.VERSION_V1}/master-data/village-pictures/${params.id}`,
    params.data,
  );
  return result.data.data;
};

export const deleteVillagePicture = async (id: TVillagePictureResponse['id']): Promise<string> => {
  const result = await axios.delete<TResponseData<string>>(
    `${versionApi.VERSION_V1}/master-data/village-pictures/${id}`,
  );
  return result.data.data;
};
