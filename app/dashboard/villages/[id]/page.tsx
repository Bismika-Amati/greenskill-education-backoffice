'use client';

import { OwnRow, OwnSearchSelect } from '@/components/atoms';
import { VillagePictureCard } from '@/components/organisms';
import { ProblemStatementCard } from '@/components/organisms/cards/ProblemStatementCard';
import { TPageProps } from '@/modules/commons/entities';
import { useOptionCities } from '@/modules/master-data/regions/cities/utils';
import { useOptionDistricts } from '@/modules/master-data/regions/districts/utils';
import { useOptionProvinces } from '@/modules/master-data/regions/provinces/utils';
import { useOptionSubDistricts } from '@/modules/master-data/regions/sub-districts/utils';
import { DEFAULT_ROLES } from '@/modules/master-data/roles/enums';
import { useOptionUsers } from '@/modules/master-data/users/utils';
import { TVillageForm } from '@/modules/master-data/villages/entities';
import { useFetchVillageDetails } from '@/modules/master-data/villages/hooks';
import { useVillageForm } from '@/modules/master-data/villages/utils';
import { resetErrorForm } from '@/utils/helpers/form';
import { setRequired } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default (props: TPageProps) => {
  const { params } = props;
  const ID = params.id;
  const router = useRouter();

  const detailHook = useFetchVillageDetails(ID, {
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });
  const { form, watchForm, onUpdate, updateMutation } = useVillageForm(ID);

  const onFinish = (values: TVillageForm) => {
    resetErrorForm(form);

    values.latlong = '';
    onUpdate(values).then((data) => {
      router.push(`/dashboard/villages/${data.id}`);
    });
  };

  const { provinceOptions, provinceOptionDataHook } = useOptionProvinces(
    {
      search: detailHook.data?.province.name,
    },
    { enabled: !!detailHook.data?.province.name },
  );
  const { cityOptions, cityOptionDataHook } = useOptionCities(
    {
      provinceId: watchForm?.provinceId,
      search: detailHook.data?.city.name,
    },
    { enabled: !!watchForm?.provinceId && !!detailHook.data?.city.name },
  );
  const { districtOptions, districtOptionDataHook } = useOptionDistricts(
    {
      cityId: watchForm?.cityId,
      search: detailHook.data?.district.name,
    },
    { enabled: !!watchForm?.cityId && !!detailHook.data?.city.name },
  );
  const { subDistrictOptions, subDistrictOptionDataHook } = useOptionSubDistricts(
    {
      districtId: watchForm?.districtId,
      search: detailHook.data?.subDistrict.name,
    },
    { enabled: !!watchForm?.districtId && !!detailHook.data?.subDistrict.name },
  );
  const { userOptions, userOptionDataHook } = useOptionUsers({
    role: DEFAULT_ROLES.PicVillage,
    search: DEFAULT_ROLES.PicVillage,
  });

  return (
    <>
      <PageContainer
        header={{
          title: `Village Details (${detailHook.data?.name})`,
        }}
      >
        <OwnRow>
          <Col span={24}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <OwnRow>
                  <Col span={24} lg={12}>
                    <Form.Item name="name" label="Name" rules={[setRequired]}>
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="picId" label="PIC" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={userOptions.options}
                        onSearch={userOptions.setSearch}
                        fetching={userOptionDataHook.isFetching}
                        placeholder="PIC"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item name="description" label="Description" rules={[setRequired]}>
                      <Input.TextArea placeholder="Description" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="provinceId" label="Province" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={provinceOptions.options}
                        onSearch={provinceOptions.setSearch}
                        fetching={provinceOptionDataHook.isFetching}
                        placeholder="Province"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="cityId" label="City" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={cityOptions.options}
                        onSearch={cityOptions.setSearch}
                        fetching={cityOptionDataHook.isFetching}
                        placeholder="City"
                        disabled={!watchForm?.provinceId}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="districtId" label="District" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={districtOptions.options}
                        onSearch={districtOptions.setSearch}
                        fetching={districtOptionDataHook.isFetching}
                        placeholder="District"
                        disabled={!watchForm?.cityId}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="subDistrictId" label="Sub District" rules={[setRequired]}>
                      <OwnSearchSelect
                        options={subDistrictOptions.options}
                        onSearch={subDistrictOptions.setSearch}
                        fetching={subDistrictOptionDataHook.isFetching}
                        placeholder="Sub District"
                        disabled={!watchForm?.districtId}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={12}>
                    <Form.Item name="postcode" label="Post Code" rules={[setRequired]}>
                      <Input placeholder="Post Code" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item name="address" label="Address" rules={[setRequired]}>
                      <Input.TextArea placeholder="Address" />
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
            <VillagePictureCard params={params} />
          </Col>

          <Col span={24}>
            <ProblemStatementCard params={params} />
          </Col>
        </OwnRow>
      </PageContainer>
    </>
  );
};
