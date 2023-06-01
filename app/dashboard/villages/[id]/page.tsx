'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TPageProps } from '@/modules/commons/entities';
import { useOptionCities } from '@/modules/master-data/regions/cities/utils';
import { useOptionDistricts } from '@/modules/master-data/regions/districts/utils';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { useOptionSubDistricts } from '@/modules/master-data/regions/sub-districts/utils';
import { DEFAULT_ROLES } from '@/modules/master-data/roles/enums';
import { useOptionUsers } from '@/modules/master-data/users/utils';
import { TVillageForm } from '@/modules/master-data/villages/entities';
import { useFetchVillageDetails, useUpdateVillage } from '@/modules/master-data/villages/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default ({ params }: TPageProps) => {
  const ID = params.id;
  const router = useRouter();

  const detailHook = useFetchVillageDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });
  const updateMutation = useUpdateVillage();

  const [form] = Form.useForm<TVillageForm>();
  const watchForm = Form.useWatch<TVillageForm | undefined>([], form);
  const onFinish = (values: TVillageForm) => {
    resetErrorForm(form);

    values.latlong = '1234,1234';
    updateMutation.mutate(
      {
        id: ID,
        data: values,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/villages');
          successNotification();
        },
        onError: (data) => {
          failedNotification();
          setErrorForm(form, data.message);
        },
      },
    );
  };

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces();
  const { cityOptions, cityOptionDataHook } = useOptionCities(
    {
      provinceId: watchForm?.provinceId,
    },
    { enabled: !!watchForm?.provinceId },
  );
  const { districtOptions, districtOptionDataHook } = useOptionDistricts(
    {
      cityId: watchForm?.cityId,
    },
    { enabled: !!watchForm?.cityId },
  );
  const { subDistrictOptions, subDistrictOptionDataHook } = useOptionSubDistricts(
    {
      districtId: watchForm?.districtId,
    },
    { enabled: !!watchForm?.districtId },
  );
  const { userOptions, userOptionDataHook } = useOptionUsers({
    role: DEFAULT_ROLES.PicVillage,
  });

  return (
    <>
      <PageContainer
        header={{
          title: `Village Details (${detailHook.data?.name})`,
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[setRequired]}>
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[setRequired]}>
                  <Input.TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item name="provinceId" label="Province" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={provinceOptions.options}
                    onSearch={provinceOptions.setSearch}
                    fetching={provinceOptionDataHook.isFetching}
                    placeholder="Province"
                  />
                </Form.Item>

                <Form.Item name="cityId" label="City" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={cityOptions.options}
                    onSearch={cityOptions.setSearch}
                    fetching={cityOptionDataHook.isFetching}
                    placeholder="City"
                    disabled={!watchForm?.provinceId}
                  />
                </Form.Item>

                <Form.Item name="districtId" label="District" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={districtOptions.options}
                    onSearch={districtOptions.setSearch}
                    fetching={districtOptionDataHook.isFetching}
                    placeholder="District"
                    disabled={!watchForm?.cityId}
                  />
                </Form.Item>

                <Form.Item name="subDistrictId" label="Sub District" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={subDistrictOptions.options}
                    onSearch={subDistrictOptions.setSearch}
                    fetching={subDistrictOptionDataHook.isFetching}
                    placeholder="Sub District"
                    disabled={!watchForm?.districtId}
                  />
                </Form.Item>

                <Form.Item name="postcode" label="Post Code" rules={[setRequired]}>
                  <Input placeholder="Post Code" />
                </Form.Item>

                <Form.Item name="address" label="Address" rules={[setRequired]}>
                  <Input.TextArea placeholder="Address" />
                </Form.Item>

                <Form.Item name="picId" label="PIC" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={userOptions.options}
                    onSearch={userOptions.setSearch}
                    fetching={userOptionDataHook.isFetching}
                    placeholder="PIC"
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
