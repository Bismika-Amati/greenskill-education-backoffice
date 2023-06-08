'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TUserResponse } from '@/modules/master-data/users/entities';
import { useFetchUsers } from '@/modules/master-data/users/hooks';
import { useUserForm } from '@/modules/master-data/users/utils';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchUsers({
    ...paginateParams,
  });

  const { deleteMutation, onDelete } = useUserForm();

  const columns: ColumnsType<TUserResponse> = [
    {
      title: 'Fullname',
      dataIndex: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Link href={`/dashboard/users/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" type="link" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            type="link"
            loading={deleteMutation.isLoading}
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

  return (
    <>
      <PageContainer
        header={{
          title: 'Users',
        }}
        extra={[
          <Link key="1" href="/dashboard/users/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Item
            </Button>
          </Link>,
        ]}
      >
        <OwnTable
          loading={dataHook.isFetching}
          columns={columns}
          dataSource={dataHook.data?.data}
          meta={dataHook.data?.meta}
          onChange={onChangePaginateParams}
        />
      </PageContainer>
    </>
  );
};
