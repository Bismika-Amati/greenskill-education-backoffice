import { TPageProps } from '@/modules/commons/entities';
import { TCourseSkillForm, TCourseSkillResponse } from '@/modules/master-data/course-skills/entities';
import { useFetchCourseSkills } from '@/modules/master-data/course-skills/hooks';
import { useCourseSkillForm } from '@/modules/master-data/course-skills/utils';
import { useOwnDrawer, showDeleteConfirm } from '@/utils/helpers/modal';
import { setRequired } from '@/utils/helpers/validations';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Button, Card, Drawer, Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useOwnPaginaiton, OwnTable } from '../tables';

type CourseSkillProps = TPageProps;

export const CourseSkillCard: React.FC<CourseSkillProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchCourseSkills(
    {
      ...paginateParams,
      courseId: params.id,
    },
    {
      enabled: !!params.id,
    },
  );

  const [activedId, setActivedId] = useState('');
  const drawer = useOwnDrawer();
  const { form, onCreate, onUpdate, onDelete, createMutation, updateMutation, deleteMutation } =
    useCourseSkillForm(activedId);

  const onFinish = (values: TCourseSkillForm) => {
    values.courseId = params.id;
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

  const onEdit = (data: TCourseSkillResponse) => {
    setActivedId(data.id);
    drawer.onTrigger();
    form.setFieldsValue(data);
  };

  const onRemove = (data: TCourseSkillResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(data.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TCourseSkillResponse> = [
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
      title="Course Skills"
      extra={
        <Button type="primary" onClick={drawer.onTrigger} loading={createMutation.isLoading}>
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

      <Drawer title="Handle Course Skill" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[setRequired]}>
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item>
            <Space align="end">
              <Button type="primary" htmlType="submit" loading={updateMutation.isLoading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
};
