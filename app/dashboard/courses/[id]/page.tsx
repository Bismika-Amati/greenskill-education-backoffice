'use client';

import { OwnRow } from '@/components/atoms';
import { OwnUpload } from '@/components/atoms/inputs/OwnUpload';
import { CourseSkillCard, SubModuleCard } from '@/components/organisms';
import { TPageProps } from '@/modules/commons/entities';
import { useFetchCourseDetails } from '@/modules/master-data/courses/hooks';
import { useCourseForm } from '@/modules/master-data/courses/utils';
import { FilePlace } from '@/modules/media/enums';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, InputNumber, Space, Typography } from 'antd';

export default (props: TPageProps) => {
  const { params } = props;
  const ID = params.id;

  const { form, onUpdate, updateMutation } = useCourseForm(ID);
  const detailHook = useFetchCourseDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });

  return (
    <>
      <PageContainer
        header={{
          title: `Course Details (${detailHook.data?.title})`,
        }}
      >
        <OwnRow>
          <Col span={24}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onUpdate}>
                <OwnRow>
                  <Col span={24} lg={12}>
                    <Form.Item name="title" label="Title" rules={[setRequired]}>
                      <Input placeholder="Title" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="amount" label="Amount" rules={[setRequired]}>
                      <InputNumber placeholder="Amount" style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item name="description" label="Description" rules={[setRequired]}>
                      <Input.TextArea placeholder="Description" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="estimateCompleated" label="Estimate Compleated" rules={[setRequired]}>
                      <InputNumber
                        placeholder="Amount"
                        style={{ width: '100%' }}
                        addonAfter={<Typography.Text>hour</Typography.Text>}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="photo" label="Photo" rules={[setRequired]}>
                      <OwnUpload
                        filePlace={FilePlace.CoursePicture}
                        defaultFile={detailHook.data?.photo}
                        onUploaded={(filename) => form.setFieldValue('photo', filename)}
                      />
                    </Form.Item>
                  </Col>
                </OwnRow>

                <Form.Item>
                  <Space align="end">
                    <Button type="primary" htmlType="submit" loading={updateMutation.isLoading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col span={24} lg={12}>
            <CourseSkillCard params={params} />
          </Col>

          <Col span={24}>
            <SubModuleCard params={params} />
          </Col>
        </OwnRow>
      </PageContainer>
    </>
  );
};
