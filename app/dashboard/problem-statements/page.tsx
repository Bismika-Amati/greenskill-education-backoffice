'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TProblemStatementResponse } from '@/modules/master-data/problem-statements/entities';
import { useFetchProblemStatements } from '@/modules/master-data/problem-statements/hooks';
import { useProblemStatementForm } from '@/modules/master-data/problem-statements/utils';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchProblemStatements({
    ...paginateParams,
  });

  const { onDelete } = useProblemStatementForm();

  const columns: ColumnsType<TProblemStatementResponse> = [
    {
      title: 'Topic',
      dataIndex: 'topic',
    },
    {
      title: 'Village',
      dataIndex: 'villageId',
      render: (_, record) => <Typography.Text>{record.village.name}</Typography.Text>,
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Link href={`/dashboard/problem-statements/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" type="link" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            type="link"
            onClick={() => {
              showDeleteConfirm({
                onOk: () =>
                  onDelete(record.id).then(() => {
                    dataHook.refetch();
                  }),
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageContainer
        header={{
          title: 'Problem Statements',
        }}
        extra={[
          <Link key="1" href="/dashboard/problem-statements/create">
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
