'use client';

import { OwnRow } from '@/components/atoms';
import { OwnUpload } from '@/components/atoms/inputs/OwnUpload';
import { TCourseForm } from '@/modules/master-data/courses/entities';
import { useCourseForm } from '@/modules/master-data/courses/utils';
import { FilePlace } from '@/modules/media/enums';
import { resetErrorForm } from '@/utils/helpers/form';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, InputNumber, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { form, onCreate, createMutation } = useCourseForm();

  const onFinish = (values: TCourseForm) => {
    resetErrorForm(form);

    onCreate(values).then((data) => {
      router.push(`/dashboard/courses/${data.id}`);
    });
  };

  return (
    <>
      <PageContainer
        header={{
          title: 'Create Course',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="title" label="Title" rules={[setRequired]}>
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[setRequired]}>
                  <Input.TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item name="photo" label="Photo" rules={[setRequired]}>
                  <OwnUpload
                    filePlace={FilePlace.CoursePicture}
                    onUploaded={(filename) => form.setFieldValue('photo', filename)}
                  />
                </Form.Item>

                <Form.Item name="amount" label="Amount" rules={[setRequired]}>
                  <InputNumber placeholder="Amount" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="estimateCompleated" label="Estimate Compleated" rules={[setRequired]}>
                  <InputNumber
                    placeholder="Amount"
                    style={{ width: '100%' }}
                    addonAfter={<Typography.Text>hour</Typography.Text>}
                  />
                </Form.Item>

                <Form.Item>
                  <Space align="end">
                    <Button type="primary" htmlType="submit" loading={createMutation.isLoading}>
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
