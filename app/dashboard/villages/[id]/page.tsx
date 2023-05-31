'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { useOptionCities } from '@/modules/master-data/regions/cities/utils';
import { useOptionDistricts } from '@/modules/master-data/regions/districts/utils';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { useOptionSubDistricts } from '@/modules/master-data/regions/sub-districts/utils';
import { TVillageForm } from '@/modules/master-data/villages/entities';
import { useCreateVillage } from '@/modules/master-data/villages/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default () => {
  const router = useRouter();

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces();
  const { cityOptions, cityOptionDataHook } = useOptionCities();
  const { districtOptions, districtOptionDataHook } = useOptionDistricts();
  const { subDistrictOptions, subDistrictOptionDataHook } = useOptionSubDistricts();

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
                <Form.Item name="name" label="Name" rules={[setRequired]}>
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

                <Form.Item name="cityId" label="City">
                  <OwnSearchSelect
                    options={cityOptions.options}
                    onSearch={cityOptions.setSearch}
                    fetching={cityOptionDataHook.isFetching}
                    placeholder="City"
                  />
                </Form.Item>

                <Form.Item name="provinceId" label="District">
                  <OwnSearchSelect
                    options={districtOptions.options}
                    onSearch={districtOptions.setSearch}
                    fetching={districtOptionDataHook.isFetching}
                    placeholder="District"
                  />
                </Form.Item>

                <Form.Item name="subDistrictId" label="Sub District">
                  <OwnSearchSelect
                    options={subDistrictOptions.options}
                    onSearch={subDistrictOptions.setSearch}
                    fetching={subDistrictOptionDataHook.isFetching}
                    placeholder="Sub District"
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
