'use client';

import { OwnRow } from '@/components/atoms';
import { TProvinceForm } from '@/modules/master-data/regions/provinces/entities';
import { useCreateProvince } from '@/modules/master-data/regions/provinces/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const createMutation = useCreateProvince();

  const [form] = Form.useForm<TProvinceForm>();
  const onFinish = (values: TProvinceForm) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        router.push('/dashboard/regions/provinces');
        successNotification();
      },
      onError: () => {
        failedNotification();
      },
    });
  };

  return (
    <>
      <PageContainer
        header={{
          title: 'Create Province',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="name" />
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
