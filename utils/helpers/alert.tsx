import { Typography, notification } from 'antd';

export const successNotification = () => {
  notification.success({
    message: `Success`,
    description: <Typography.Text>successfully take action!</Typography.Text>,
    placement: 'topRight',
  });
};

export const failedNotification = () => {
  notification.error({
    message: `Failed`,
    description: <Typography.Text>Failed take action!</Typography.Text>,
    placement: 'topRight',
  });
};
