import { TPageProps } from '@/modules/commons/entities';
import { TCustomerSegmentForm, TCustomerSegmentResponse } from '@/modules/master-data/customer-segments/entities';
import { useFetchCustomerSegments } from '@/modules/master-data/customer-segments/hooks';
import { useCustomerSegmentForm } from '@/modules/master-data/customer-segments/utils';
import { useOwnDrawer, showDeleteConfirm } from '@/utils/helpers/modal';
import { setRequired } from '@/utils/helpers/validations';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Button, Card, Drawer, Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useOwnPaginaiton, OwnTable } from '../tables';

type CustomerSegmentCardProps = TPageProps;

export const CustomerSegmentCard: React.FC<CustomerSegmentCardProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton(5);
  const dataHook = useFetchCustomerSegments({
    ...paginateParams,
  });

  const [activedId, setActivedId] = useState('');
  const drawer = useOwnDrawer();
  const { form, onCreate, onUpdate, onDelete } = useCustomerSegmentForm(activedId);

  const onFinish = (values: TCustomerSegmentForm) => {
    values.problemStatementId = params.id;

    const onForm = activedId ? onUpdate(values) : onCreate(values);
    onForm.then(() => {
      onClose();
      dataHook.refetch();
    });
  };

  const onClose = () => {
    drawer.onTrigger();
    form.resetFields();
  };

  const onEdit = (data: TCustomerSegmentResponse) => {
    setActivedId(data.id);
    drawer.onTrigger();
    form.setFieldsValue(data);
  };

  const onRemove = (data: TCustomerSegmentResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(data.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TCustomerSegmentResponse> = [
    {
      title: 'Title',
      dataIndex: 'title',
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
      title="Customer Segments"
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

      <Drawer title="Handle Customer Segment" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[setRequired]}>
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Description" />
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
