'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TCityForm } from '@/modules/master-data/regions/cities/entities';
import { useCreateCity } from '@/modules/master-data/regions/cities/hooks';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces();
  const createMutation = useCreateCity();

  const [form] = Form.useForm<TCityForm>();
  const onFinish = (values: TCityForm) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        router.push('/dashboard/regions/cities');
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
          title: 'Create City',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item name="provinceId" label="Province" rules={[{ required: true }]}>
                  <OwnSearchSelect
                    options={provinceOptions.options}
                    onSearch={provinceOptions.setSearch}
                    fetching={provinceOptionDataHook.isFetching}
                    placeholder="Province"
                  />
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
