'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { useOptionCourses } from '@/modules/master-data/courses/utils';
import { TUserCourseForm } from '@/modules/master-data/user-courses/entities';
import { useUserCourseForm } from '@/modules/master-data/user-courses/utils';
import { useOptionUsers } from '@/modules/master-data/users/utils';
import { resetErrorForm } from '@/utils/helpers/form';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, InputNumber, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { form, onCreate } = useUserCourseForm();

  const onFinish = (values: TUserCourseForm) => {
    resetErrorForm(form);

    if (!values.rating) values.rating = 0;
    if (!values.feedback) values.feedback = '';
    if (!values.experience) values.experience = '';

    onCreate(values).then((data) => {
      router.push(`/dashboard/user-courses/${data.id}`);
    });
  };

  const { courseOptions, courseOptionDataHook } = useOptionCourses();
  const { userOptions, userOptionDataHook } = useOptionUsers();

  return (
    <>
      <PageContainer
        header={{
          title: 'Create User Course',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="courseId" label="Course Id" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={courseOptions.options}
                    onSearch={courseOptions.setSearch}
                    fetching={courseOptionDataHook.isFetching}
                    placeholder="Course Id"
                  />
                </Form.Item>

                <Form.Item name="userId" label="User Id" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={userOptions.options}
                    onSearch={userOptions.setSearch}
                    fetching={userOptionDataHook.isFetching}
                    placeholder="User Id"
                  />
                </Form.Item>

                <Form.Item name="rating" label="Rating">
                  <InputNumber placeholder="Rating" style={{ width: '100%' }} max={5} min={0} />
                </Form.Item>

                <Form.Item name="feedback" label="Feedback">
                  <Input placeholder="Feedback" />
                </Form.Item>

                <Form.Item name="experience" label="Experience">
                  <Input.TextArea placeholder="Experience" />
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
        </OwnRow>
      </PageContainer>
    </>
  );
};
