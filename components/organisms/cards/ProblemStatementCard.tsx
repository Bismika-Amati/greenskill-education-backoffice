import { TPageProps } from '@/modules/commons/entities';
import { showDeleteConfirm, useOwnDrawer } from '@/utils/helpers/modal';
import { Button, Card, Drawer, Form, Input, Space } from 'antd';
import { useState } from 'react';
import { OwnTable, useOwnPaginaiton } from '../tables';
import { useFetchProblemStatements } from '@/modules/master-data/problem-statements/hooks';
import { TProblemStatementForm, TProblemStatementResponse } from '@/modules/master-data/problem-statements/entities';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useProblemStatementForm } from '@/modules/master-data/problem-statements/utils';
import { setRequired } from '@/utils/helpers/validations';
import { PredictProblemDrawer } from '../drawers';

type ProblemStatementCardProps = TPageProps;

export const ProblemStatementCard: React.FC<ProblemStatementCardProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchProblemStatements(
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
  const { form, onCreate, onUpdate, onDelete, createMutation, updateMutation, deleteMutation } =
    useProblemStatementForm(activedId);

  const onFinish = (values: TProblemStatementForm) => {
    values.villageId = params.id;
    if (!values.description) values.description = '';

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

  const onEdit = (data: TProblemStatementResponse) => {
    setActivedId(data.id);
    drawer.onTrigger();
    form.setFieldsValue(data);
  };

  const onRemove = (data: TProblemStatementResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(data.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TProblemStatementResponse> = [
    {
      title: 'Topic',
      dataIndex: 'topic',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            key={1}
            icon={<EditOutlined />}
            size="small"
            type="link"
            onClick={() => onEdit(record)}
            loading={updateMutation.isLoading}
          />
          <Button
            key={2}
            icon={<DeleteOutlined />}
            danger
            size="small"
            type="link"
            onClick={() => onRemove(record)}
            loading={deleteMutation.isLoading}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Problem Statements"
      extra={
        <Space>
          <PredictProblemDrawer villageId={params.id} dataHook={dataHook} />
          <Button type="primary" onClick={drawer.onTrigger}>
            Add Item
          </Button>
        </Space>
      }
    >
      <OwnTable
        loading={dataHook.isFetching}
        columns={columns}
        dataSource={dataHook.data?.data}
        meta={dataHook.data?.meta}
        onChange={onChangePaginateParams}
      />

      <Drawer title="Handle Problem Statement" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="topic" label="Topic" rules={[setRequired]}>
            <Input placeholder="Topic" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item>
            <Space align="end">
              <Button
                type="primary"
                htmlType="submit"
                loading={activedId ? updateMutation.isLoading : createMutation.isLoading}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
};
