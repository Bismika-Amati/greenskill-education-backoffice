'use client';

import { OwnRow } from '@/components/atoms';
import { TPageProps } from '@/modules/commons/entities';
import { TRoleForm } from '@/modules/master-data/roles/entities';
import { useFetchRoleDetails, useUpdateRole } from '@/modules/master-data/roles/hooks';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default ({ params }: TPageProps) => {
  const ID = params.id;

  const router = useRouter();

  const detailHook = useFetchRoleDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        name: data.name,
      });
    },
  });
  const updateMutation = useUpdateRole();

  const [form] = Form.useForm<TRoleForm>();
  const onFinish = (values: TRoleForm) => {
    resetErrorForm(form);
    updateMutation.mutate(
      {
        id: ID,
        data: values,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/roles');
          successNotification();
        },
        onError: (data) => {
          failedNotification();
          setErrorForm(form, data.message);
        },
      },
    );
  };

  return (
    <>
      <PageContainer
        header={{
          title: `Role Details (${detailHook.data?.name})`,
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
                      Save
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
