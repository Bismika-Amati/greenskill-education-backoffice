'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { ExistingAlternativeCard } from '@/components/organisms';
import { TPageProps } from '@/modules/commons/entities';
import { useFetchProblemStatementDetails } from '@/modules/master-data/problem-statements/hooks';
import { useProblemStatementForm } from '@/modules/master-data/problem-statements/utils';
import { useOptionVillages } from '@/modules/master-data/villages/utils';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';

export default (props: TPageProps) => {
  const { params } = props;
  const ID = params.id;

  const problemStatementForm = useProblemStatementForm(ID);
  const detailHook = useFetchProblemStatementDetails(ID, {
    onSuccess: (data) => {
      problemStatementForm.form.setFieldsValue({
        ...data,
      });
    },
  });

  const { villageOptions, villageOptionDataHook } = useOptionVillages();

  return (
    <>
      <PageContainer
        header={{
          title: `Problem Statement Details (${detailHook.data?.topic})`,
        }}
      >
        <OwnRow>
          <Col span={24}>
            <Card>
              <Form form={problemStatementForm.form} layout="vertical" onFinish={problemStatementForm.onUpdate}>
                <OwnRow>
                  <Col span={24} lg={12}>
                    <Form.Item name="topic" label="Topic" rules={[setRequired]}>
                      <Input placeholder="Topic" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="villageId" label="Village" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={villageOptions.options}
                        onSearch={villageOptions.setSearch}
                        fetching={villageOptionDataHook.isFetching}
                        placeholder="Village"
                      />
                    </Form.Item>
                  </Col>
                </OwnRow>

                <Form.Item name="description" label="Description" rules={[setRequired]}>
                  <Input.TextArea placeholder="Description" />
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

          <Col span={24}>
            <ExistingAlternativeCard params={params} />
          </Col>
        </OwnRow>
      </PageContainer>
    </>
  );
};
