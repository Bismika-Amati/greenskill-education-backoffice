'use client';

import { OwnTable, useOwnPaginaiton } from '@/components/organisms';
import { TUserCourseResponse } from '@/modules/master-data/user-courses/entities';
import { useFetchUserCourses } from '@/modules/master-data/user-courses/hooks';
import { useUserCourseForm } from '@/modules/master-data/user-courses/utils';
import { showDeleteConfirm } from '@/utils/helpers/modal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

export default () => {
  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchUserCourses({
    ...paginateParams,
  });

  const { onDelete } = useUserCourseForm();

  const columns: ColumnsType<TUserCourseResponse> = [
    {
      title: 'User',
      dataIndex: 'userId',
      render: (_, record) => <Typography.Text>{record.user.fullname}</Typography.Text>,
    },
    {
      title: 'Course',
      dataIndex: 'courseId',
      render: (_, record) => <Typography.Text>{record.course.title}</Typography.Text>,
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Link href={`/dashboard/user-courses/${record.id}`}>
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
    <>
      <PageContainer
        header={{
          title: 'UserCourses',
        }}
        extra={[
          <Link key="1" href="/dashboard/user-courses/create">
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
