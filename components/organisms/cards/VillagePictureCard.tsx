import { TPageProps } from '@/modules/commons/entities';
import { showDeleteConfirm, useOwnDrawer } from '@/utils/helpers/modal';
import { Button, Card, Drawer, Form, Image, Space } from 'antd';
import { useState } from 'react';
import { OwnTable, useOwnPaginaiton } from '../tables';
import { useFetchVillagePictures } from '@/modules/master-data/village-pictures/hooks';
import { TVillagePictureForm, TVillagePictureResponse } from '@/modules/master-data/village-pictures/entities';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useVillagePictureForm } from '@/modules/master-data/village-pictures/utils';
import { setRequired } from '@/utils/helpers/validations';
import { OwnUpload } from '@/components/atoms/inputs/OwnUpload';
import { FilePlace } from '@/modules/media/enums';

type VillagePictureCardProps = TPageProps;

export const VillagePictureCard: React.FC<VillagePictureCardProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchVillagePictures(
    {
      ...paginateParams,
      villageId: params.id,
    },
    {
      enabled: !!params.id,
    },
  );

  const [activedId, setActivedId] = useState('');
  const drawer = useOwnDrawer();
  const { form, watchForm, onCreate, onUpdate, onDelete } = useVillagePictureForm(activedId);

  const onFinish = (values: TVillagePictureForm) => {
    values.villageId = params.id;

    const onForm = activedId ? onUpdate(values) : onCreate(values);
    onForm.then(() => {
      onClose();
      dataHook.refetch();
    });
  };

  const onClose = () => {
    setActivedId('');
    drawer.onTrigger();
    form.resetFields();
  };

  const onEdit = (data: TVillagePictureResponse) => {
    setActivedId(data.id);
    drawer.onTrigger();
    form.setFieldsValue(data);
  };

  const onRemove = (data: TVillagePictureResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(data.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TVillagePictureResponse> = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      render: (value) => value && <Image width={200} src={value} />,
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button key={1} icon={<EditOutlined />} size="small" type="link" onClick={() => onEdit(record)} />
          <Button key={2} icon={<DeleteOutlined />} danger size="small" type="link" onClick={() => onRemove(record)} />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Village Pictures"
      extra={
        <Button type="primary" onClick={drawer.onTrigger}>
          Add Item
        </Button>
      }
    >
      <OwnTable
        loading={dataHook.isFetching}
        columns={columns}
        dataSource={dataHook.data?.data}
        meta={dataHook.data?.meta}
        onChange={onChangePaginateParams}
      />

      <Drawer title="Handle Existing Alternative" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="photo" label="Photo" rules={[setRequired]}>
            <OwnUpload
              filePlace={FilePlace.VillagePicture}
              defaultFile={watchForm?.photo}
              onUploaded={(filename) => form.setFieldValue('photo', filename)}
            />
          </Form.Item>

          <Form.Item>
            <Space align="end">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
};
