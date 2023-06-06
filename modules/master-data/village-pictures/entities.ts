import { TPaginateParams } from '@/modules/commons/entities';
import { TVillageResponse } from '../villages/entities';

export type TVillagePictureResponse = {
  id: string;
  photo: string;
  villageId: string;
  village: TVillageResponse;
};

export type TVillagePicturesParams = TPaginateParams & {
  villageId?: string;
};

export type TVillagePictureForm = {
  photo: string;
  villageId: string;
};

export type TUpdateVillagePictureParams = {
  id: TVillagePictureResponse['id'];
  data: TVillagePictureForm;
};
