'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TVillageResponse } from '@/modules/master-data/villages/entities';
import { useFetchVillages } from '@/modules/master-data/villages/hooks';
import { useVillageForm } from '@/modules/master-data/villages/utils';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchVillages({
    ...paginateParams,
  });

  const { onDelete, deleteMutation } = useVillageForm();

  const columns: ColumnsType<TVillageResponse> = [
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
          <Link href={`/dashboard/villages/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" type="link" loading={deleteMutation.isLoading} />
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
    <>
      <PageContainer
        header={{
          title: 'Villages',
        }}
        extra={[
          <Link key="1" href="/dashboard/villages/create">
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
