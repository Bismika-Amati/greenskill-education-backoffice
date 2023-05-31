'use client';

import { PageProps } from '@/.next/types/app/layout';
import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { useOptionCities } from '@/modules/master-data/regions/cities/utils';
import { useOptionDistricts } from '@/modules/master-data/regions/districts/utils';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { useOptionSubDistricts } from '@/modules/master-data/regions/sub-districts/utils';
import { TUserForm } from '@/modules/master-data/users/entities';
import { useFetchUserDetails, useUpdateUser } from '@/modules/master-data/users/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default ({ params }: PageProps) => {
  const ID = params.id;

  const router = useRouter();

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces();
  const { cityOptions, cityOptionDataHook } = useOptionCities();
  const { districtOptions, districtOptionDataHook } = useOptionDistricts();
  const { subDistrictOptions, subDistrictOptionDataHook } = useOptionSubDistricts();

  const detailHook = useFetchUserDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        fullname: data.fullname,
        email: data.email,
        password: '',
        phoneNumber: data.phoneNumber,
        provinceId: data.province.id,
        cityId: data.city.id,
        districtId: data.district.id,
        subDistrictId: data.subDistrict.id,
        postcode: data.postcode,
        address: data.address,
        roleId: data.role.id,
      });
    },
  });
  const updateMutation = useUpdateUser();

  const [form] = Form.useForm<TUserForm>();
  const onFinish = (values: TUserForm) => {
    resetErrorForm(form);

    updateMutation.mutate(
      {
        id: ID,
        data: values,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/users');
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
          title: 'Update User',
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="fullname" label="Fullname" rules={[{ required: true }]}>
                  <Input placeholder="Fullname" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}
                >
                  <Input type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                  <Input placeholder="Phone Number" />
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

                <Form.Item name="postcode" label="Post Code" rules={[{ required: true }]}>
                  <Input placeholder="Post Code" />
                </Form.Item>

                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                  <Input.TextArea placeholder="Address" />
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
