import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';

const { confirm } = Modal;

export const showDeleteConfirm = (props: ModalFuncProps) => {
  confirm({
    title: 'Are you sure delete this item?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    ...props,
  });
};
