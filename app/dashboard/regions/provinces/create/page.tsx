'use client';

import { OwnRow } from '@/components/atoms';
import { TProvinceForm } from '@/modules/master-data/regions/provinces/entities';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';

export default () => {
  const [form] = Form.useForm<TProvinceForm>();
  const handleOk = () => {
    console.log('asc', form.getFieldsValue());
  };

  const onFinish = (values: TProvinceForm) => {
    console.log('ascac', values);
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