'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TCourseResponse } from '@/modules/master-data/courses/entities';
import { useFetchCourses } from '@/modules/master-data/courses/hooks';
import { useCourseForm } from '@/modules/master-data/courses/utils';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchCourses({
    ...paginateParams,
  });

  const { onDelete, deleteMutation } = useCourseForm();

  const columns: ColumnsType<TCourseResponse> = [
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
          <Link href={`/dashboard/courses/${record.id}`}>
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
          title: 'Courses',
        }}
        extra={[
          <Link key="1" href="/dashboard/courses/create">
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
