'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TDistrictResponse } from '@/modules/master-data/regions/districts/entities';
import { useFetchDistricts } from '@/modules/master-data/regions/districts/hooks';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchDistricts({
    ...paginateParams,
  });

  const columns: ColumnsType<TDistrictResponse> = [
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
            // onClick={() =>
            //   showDeleteConfirm({
            //     onOk: () => onDelete(record.id),
            //   })
            // }
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Provinces',
      }}
      extra={[
        <Button key="1" type="primary" icon={<PlusOutlined />}>
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
    </PageContainer>
  );
};
