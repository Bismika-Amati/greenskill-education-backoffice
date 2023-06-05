'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TProblemStatementForm } from '@/modules/master-data/problem-statements/entities';
import { useProblemStatementForm } from '@/modules/master-data/problem-statements/utils';
import { useOptionVillages } from '@/modules/master-data/villages/utils';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { form, onCreate } = useProblemStatementForm();

  const { villageOptions, villageOptionDataHook } = useOptionVillages();

  const onStore = (values: TProblemStatementForm) => {
    onCreate(values).then((data) => {
      router.push(`/dashboard/problem-statements/${data.id}`);
    });
  };

  return (
    <>
      <PageContainer
        header={{
          title: 'Create Problem Statement',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onStore}>
                <Form.Item name="topic" label="Topic" rules={[setRequired]}>
                  <Input placeholder="Topic" />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[setRequired]}>
                  <Input.TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item name="villageId" label="Village" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={villageOptions.options}
                    onSearch={villageOptions.setSearch}
                    fetching={villageOptionDataHook.isFetching}
                    placeholder="Village"
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
