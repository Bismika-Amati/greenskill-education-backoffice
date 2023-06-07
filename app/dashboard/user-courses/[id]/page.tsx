'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TPageProps } from '@/modules/commons/entities';
import { useOptionCourses } from '@/modules/master-data/courses/utils';
import { useFetchUserCourseDetails } from '@/modules/master-data/user-courses/hooks';
import { useUserCourseForm } from '@/modules/master-data/user-courses/utils';
import { useOptionUsers } from '@/modules/master-data/users/utils';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, InputNumber, Space } from 'antd';

export default (props: TPageProps) => {
  const { params } = props;
  const ID = params.id;

  const { form, onUpdate } = useUserCourseForm(ID);
  const detailHook = useFetchUserCourseDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });

  const { courseOptions, courseOptionDataHook } = useOptionCourses();
  const { userOptions, userOptionDataHook } = useOptionUsers();

  return (
    <>
      <PageContainer
        header={{
          title: `User Course Details (${detailHook.data?.user.fullname} - ${detailHook.data?.course.title})`,
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onUpdate}>
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
