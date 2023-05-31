'use client';

import { PageProps } from '@/.next/types/app/layout';
import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TCityForm } from '@/modules/master-data/regions/cities/entities';
import { useFetchCityDetails, useUpdateCity } from '@/modules/master-data/regions/cities/hooks';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { failedNotification, successNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default ({ params }: PageProps) => {
  const ID = params.id;

  const router = useRouter();

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces();
  const detailHook = useFetchCityDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        name: data.name,
        provinceId: data.province.id,
      });
    },
  });
  const updateMutation = useUpdateCity();

  const [form] = Form.useForm<TCityForm>();
  const onFinish = (values: TCityForm) => {
    resetErrorForm(form);

    updateMutation.mutate(
      {
        id: ID,
        data: values,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/regions/cities');
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
          title: `City Details (${detailHook.data?.name})`,
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="name" />
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
