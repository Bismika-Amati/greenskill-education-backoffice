'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TPageProps } from '@/modules/commons/entities';
import { TDistrictForm } from '@/modules/master-data/regions/districts/entities';
import { useFetchDistrictDetails, useUpdateDistrict } from '@/modules/master-data/regions/districts/hooks';
import { useOptionCities } from '@/modules/master-data/regions/cities/utils';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { setRequired } from '@/utils/helpers/validations';

export default ({ params }: TPageProps) => {
  const ID = params.id;

  const router = useRouter();

  const { cityOptions, cityOptionDataHook } = useOptionCities();
  const detailHook = useFetchDistrictDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        name: data.name,
        cityId: data.city.id,
      });
    },
  });
  const updateMutation = useUpdateDistrict();

  const [form] = Form.useForm<TDistrictForm>();
  const onFinish = (values: TDistrictForm) => {
    resetErrorForm(form);
    updateMutation.mutate(
      {
        id: ID,
        data: values,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/regions/districts');
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
          title: `District Details (${detailHook.data?.name})`,
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[setRequired]}>
                  <Input placeholder="name" />
                </Form.Item>

                <Form.Item name="cityId" label="City" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={cityOptions.options}
                    onSearch={cityOptions.setSearch}
                    fetching={cityOptionDataHook.isFetching}
                    placeholder="City"
                  />
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
