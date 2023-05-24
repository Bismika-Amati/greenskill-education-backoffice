'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TProvinceForm, TProvinceResponse } from '@/modules/master-data/regions/provinces/entities';
import { useDeleteProvince, useFetchProvinces } from '@/modules/master-data/regions/provinces/hooks';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchProvinces({
    ...paginateParams,
  });

  const deleteMutation = useDeleteProvince();
  const onDelete = (id: TProvinceResponse['id']) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        dataHook.refetch();
        successNotification();
      },
      onError: () => {
        failedNotification();
      },
    });
  };

  const columns: ColumnsType<TProvinceResponse> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" type="link" />
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            type="link"
            onClick={() =>
              showDeleteConfirm({
                onOk: () => onDelete(record.id),
              })
            }
          />
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm<TProvinceForm>();
  const handleOk = () => {
    console.log('asc', form.getFieldsValue());
  };

  return (
    <>
      <PageContainer
        header={{
          title: 'Provinces',
        }}
        extra={[
          <Button key="1" type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Add Item
          </Button>,
        ]}
      >
        <OwnTable
          columns={columns}
          dataSource={dataHook.data?.data}
          meta={dataHook.data?.meta}
          onChange={onChangePaginateParams}
        />

        {/* <Modal title="Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="url"
              label="URL"
              rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal> */}
      </PageContainer>
    </>
  );
};
