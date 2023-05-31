'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { TVillageForm } from '@/modules/master-data/villages/entities';
import { useCreateVillage } from '@/modules/master-data/villages/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces();

  const createMutation = useCreateVillage();

  const [form] = Form.useForm<TVillageForm>();
  const onFinish = (values: TVillageForm) => {
    resetErrorForm(form);

    createMutation.mutate(values, {
      onSuccess: () => {
        router.push('/dashboard/villages');
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
          title: 'Create Village',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item name="provinceId" label="Province">
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
