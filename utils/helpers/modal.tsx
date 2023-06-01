import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';
import { useState } from 'react';

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

export const useOwnDrawer = () => {
  const [open, setOpen] = useState(false);
  const onTrigger = () => setOpen(!open);

  return {
    open,
    setOpen,
    onTrigger,
  };
};
