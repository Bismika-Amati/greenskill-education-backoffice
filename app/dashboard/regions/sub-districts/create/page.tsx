'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TSubDistrictForm } from '@/modules/master-data/regions/sub-districts/entities';
import { useCreateSubDistrict } from '@/modules/master-data/regions/sub-districts/hooks';
import { useOptionDistricts } from '@/modules/master-data/regions/districts/utils';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { districtOptions, districtOptionDataHook } = useOptionDistricts();
  const createMutation = useCreateSubDistrict();

  const [form] = Form.useForm<TSubDistrictForm>();
  const onFinish = (values: TSubDistrictForm) => {
    resetErrorForm(form);

    createMutation.mutate(values, {
      onSuccess: () => {
        router.push('/dashboard/regions/sub-districts');
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
          title: 'Create SubD istrict',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item name="districtId" label="District" rules={[{ required: true }]}>
                  <OwnSearchSelect
                    options={districtOptions.options}
                    onSearch={districtOptions.setSearch}
                    fetching={districtOptionDataHook.isFetching}
                    placeholder="District"
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
