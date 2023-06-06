import { uploadMedia } from '@/modules/media/apis';
import { FilePlace, FileType } from '@/modules/media/enums';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { UploadFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';

type OwnUploadProps = UploadProps & {
  filePlace: FilePlace;
  fileTypes?: FileType[];
  defaultFile?: string;
  onUploaded?: (filename: string) => void;
};

export const OwnUpload: React.FC<OwnUploadProps> = (props) => {
  const { filePlace, fileTypes, defaultFile, onUploaded, ...rest } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (defaultFile) {
      setFileList([{ uid: '1', name: defaultFile, url: defaultFile, status: 'done' }]);
    }
  }, [defaultFile]);

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      if (fileTypes) {
        const isValid = fileTypes.includes(file.type as FileType);
        if (!isValid) {
          message.error(`${file.name} is not support extension`);
        }
        return isValid || Upload.LIST_IGNORE;
      }

      return true;
    },
    customRequest: (options) => {
      const { file, onProgress, onSuccess, onError } = options;

      uploadMedia(
        { file, filePlace },
        {
          onUploadProgress: (e) => {
            onProgress && onProgress({ percent: (e.loaded / (e.total || 0)) * 100 });
          },
        },
      )
        .then((resp) => {
          const fileName = JSON.parse(resp.request.response).data.fileName;

          if (resp) {
            setFileList(
              [file as RcFile].map((item) => ({
                ...item,
                name: fileName,
                url: fileName || '',
              })),
            );
            onSuccess && onSuccess('Success', resp.request);
            onUploaded && onUploaded(fileName);
          }
        })
        .catch(() => {
          onError &&
            onError({
              name: 'attachment',
              message: 'Upload error',
            });
        });
    },
    ...rest,
    onChange: (info) => {
      console.log('info ', info);
    },
  };

  return (
    <Upload {...uploadProps} fileList={fileList}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
