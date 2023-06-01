'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TPageProps } from '@/modules/commons/entities';
import { TCustomerSegmentForm, TCustomerSegmentResponse } from '@/modules/master-data/customer-segments/entities';
import { useFetchCustomerSegments } from '@/modules/master-data/customer-segments/hooks';
import { useCustomerSegmentForm } from '@/modules/master-data/customer-segments/utils';
import { TEarlyAdopterForm, TEarlyAdopterResponse } from '@/modules/master-data/early-adopters/entities';
import { useFetchEarlyAdopters } from '@/modules/master-data/early-adopters/hooks';
import { useEarlyAdopterForm } from '@/modules/master-data/early-adopters/utils';
import { useFetchProblemStatementDetails } from '@/modules/master-data/problem-statements/hooks';
import { useProblemStatementForm } from '@/modules/master-data/problem-statements/utils';
import { useOptionVillages } from '@/modules/master-data/villages/utils';
import { showDeleteConfirm, useOwnDrawer } from '@/utils/helpers/modal';
import { setRequired } from '@/utils/helpers/validations';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Drawer, Form, Input, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default (props: TPageProps) => {
  const { params } = props;
  const ID = params.id;

  const problemStatementForm = useProblemStatementForm(ID);
  const detailHook = useFetchProblemStatementDetails(ID, {
    onSuccess: (data) => {
      problemStatementForm.form.setFieldsValue({
        ...data,
      });
    },
  });

  const { villageOptions, villageOptionDataHook } = useOptionVillages();

  return (
    <>
      <PageContainer
        header={{
          title: `Problem Statement Details (${detailHook.data?.topic})`,
        }}
      >
        <OwnRow>
          <Col span={24}>
            <Card>
              <Form form={problemStatementForm.form} layout="vertical" onFinish={problemStatementForm.onUpdate}>
                <OwnRow>
                  <Col span={24} lg={12}>
                    <Form.Item name="topic" label="Topic" rules={[setRequired]}>
                      <Input placeholder="Topic" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="villageId" label="Village" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={villageOptions.options}
                        onSearch={villageOptions.setSearch}
                        fetching={villageOptionDataHook.isFetching}
                        placeholder="Village"
                      />
                    </Form.Item>
                  </Col>
                </OwnRow>

                <Form.Item name="description" label="Description" rules={[setRequired]}>
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
            </Card>
          </Col>

          <Col span={24} lg={12}>
            <CustomerSegment params={params} />
          </Col>

          <Col span={24} lg={12}>
            <EarlyAdopter params={params} />
          </Col>
        </OwnRow>
      </PageContainer>
    </>
  );
};

const CustomerSegment: React.FC<TPageProps> = (props) => {
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
      title="Customer Segment"
      extra={
        <Button type="link" onClick={drawer.onTrigger}>
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

const EarlyAdopter: React.FC<TPageProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton(5);
  const dataHook = useFetchEarlyAdopters({
    ...paginateParams,
  });

  const [activedId, setActivedId] = useState('');
  const drawer = useOwnDrawer();
  const { form, onCreate, onUpdate, onDelete } = useEarlyAdopterForm(activedId);

  const onFinish = (values: TEarlyAdopterForm) => {
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

  const onEdit = (data: TEarlyAdopterResponse) => {
    setActivedId(data.id);
    drawer.onTrigger();
    form.setFieldsValue(data);
  };

  const onRemove = (data: TEarlyAdopterResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(data.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TEarlyAdopterResponse> = [
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
      title="Early Adopter"
      extra={
        <Button type="link" onClick={drawer.onTrigger}>
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

      <Drawer title="Handle Early Adopter" open={drawer.open} onClose={onClose}>
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
