'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { TPageProps } from '@/modules/commons/entities';
import { useOptionCities } from '@/modules/master-data/regions/cities/utils';
import { useOptionDistricts } from '@/modules/master-data/regions/districts/utils';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { useOptionSubDistricts } from '@/modules/master-data/regions/sub-districts/utils';
import { useOptionRoles } from '@/modules/master-data/roles/utils';
import { TUserForm } from '@/modules/master-data/users/entities';
import { useFetchUserDetails, useUpdateUser } from '@/modules/master-data/users/hooks';
import { successNotification, failedNotification } from '@/utils/helpers/alert';
import { resetErrorForm, setErrorForm } from '@/utils/helpers/form';
import { setRequired, setValidEmail } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default (props: TPageProps) => {
  const { params } = props;
  const ID = params.id;
  const router = useRouter();

  const detailHook = useFetchUserDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
        password: '',
      });
    },
  });
  const updateMutation = useUpdateUser();

  const [form] = Form.useForm<TUserForm>();
  const watchForm = Form.useWatch<TUserForm | undefined>([], form);
  const onFinish = (values: TUserForm) => {
    resetErrorForm(form);

    updateMutation.mutate(
      { id: ID, data: values },
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

  const { roleOptions, roleOptionDataHook } = useOptionRoles();
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

  return (
    <>
      <PageContainer
        header={{
          title: `User Details (${detailHook.data?.fullname})`,
        }}
      >
        <OwnRow>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="fullname" label="Fullname" rules={[setRequired]}>
                  <Input placeholder="Fullname" />
                </Form.Item>

                <Form.Item name="email" label="Email" rules={[setRequired, setValidEmail]}>
                  <Input type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[setRequired]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="phoneNumber" label="Phone Number" rules={[setRequired]}>
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item name="roleId" label="Role" rules={[setRequired]}>
                  <OwnSearchSelect
                    options={roleOptions.options}
                    onSearch={roleOptions.setSearch}
                    fetching={roleOptionDataHook.isFetching}
                    placeholder="Role"
                  />
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
