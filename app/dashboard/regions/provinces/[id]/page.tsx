'use client';

import { PageProps } from '@/.next/types/app/layout';
import { OwnRow } from '@/components/atoms';
import { TProvinceForm } from '@/modules/master-data/regions/provinces/entities';
import { useFetchProvinceDetails, useUpdateProvince } from '@/modules/master-data/regions/provinces/hooks';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default ({ params }: PageProps) => {
  const ID = params.id;

  const router = useRouter();

  const detailHook = useFetchProvinceDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        name: data.name,
      });
    },
  });
  const updateMutation = useUpdateProvince();

  const [form] = Form.useForm<TProvinceForm>();
  const onFinish = (values: TProvinceForm) => {
    resetErrorForm(form);
    updateMutation.mutate(
      {
        id: ID,
        data: values,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/regions/provinces');
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
          title: `Province Details (${detailHook.data?.name})`,
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
