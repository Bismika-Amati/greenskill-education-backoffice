'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TSubDistrictResponse } from '@/modules/master-data/regions/sub-districts/entities';
import { useDeleteSubDistrict, useFetchSubDistricts } from '@/modules/master-data/regions/sub-districts/hooks';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchSubDistricts({
    ...paginateParams,
  });

  const deleteMutation = useDeleteSubDistrict();
  const onDelete = (id: TSubDistrictResponse['id']) => {
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

  const columns: ColumnsType<TSubDistrictResponse> = [
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
          <Link href={`/dashboard/regions/sub-districts/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" type="link" />
          </Link>
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

  return (
    <PageContainer
      header={{
        title: 'Sub Districts',
      }}
      extra={[
        <Link key="1" href="/dashboard/regions/sub-districts/create">
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
  );
};
