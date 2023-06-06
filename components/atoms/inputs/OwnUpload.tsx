import { uploadMedia } from '@/modules/media/apis';
import { FilePlace, FileType } from '@/modules/media/enums';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps, message } from 'antd';

type OwnUploadProps = UploadProps & {
  filePlace: FilePlace;
  fileTypes?: FileType[];
  onUploaded?: (filename: string) => void;
};

export const OwnUpload: React.FC<OwnUploadProps> = (props) => {
  const { filePlace, fileTypes, onUploaded, ...rest } = props;

  const uploadProps: UploadProps = {
    maxCount: 1,
    beforeUpload: (file) => {
      console.log(file.type);
      if (fileTypes) {
        const isValid = fileTypes.includes(file.type as FileType);
        if (!isValid) {
          message.error(`${file.name} is not support extension`);
        }
        return isValid || Upload.LIST_IGNORE;
      }

      return true;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        successNotification();
      } else if (info.file.status === 'error') {
        failedNotification();
      }
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
          if (resp) {
            onSuccess && onSuccess('Success', resp.request);
            onUploaded && onUploaded(JSON.parse(resp.request.response).data.fileName);
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
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
