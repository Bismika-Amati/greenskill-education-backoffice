'use client';

import { OwnRow } from '@/components/atoms';
import { TRoleForm } from '@/modules/master-data/roles/entities';
import { useCreateRole } from '@/modules/master-data/roles/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const createMutation = useCreateRole();

  const [form] = Form.useForm<TRoleForm>();
  const onFinish = (values: TRoleForm) => {
    resetErrorForm(form);

    createMutation.mutate(values, {
      onSuccess: () => {
        router.push('/dashboard/roles');
        successNotification();
      },
      onError: (data) => {
        failedNotification();
        setErrorForm(form, data.message);
      },
    });
  };

  return (
    <>
      <PageContainer
        header={{
          title: 'Create Role',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="Name" />
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
