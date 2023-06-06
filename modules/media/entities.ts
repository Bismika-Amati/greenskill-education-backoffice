import { RcFile } from 'antd/es/upload';
import { FilePlace } from './enums';

export type TMediaResponse = {
  fileName: string;
};

export type TMediaForm = {
  file: string | Blob | RcFile;
  filePlace: FilePlace;
};
