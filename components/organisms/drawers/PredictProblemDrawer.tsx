import { OwnSearchSelect } from '@/components/atoms';
import { TPaginateResponse, TResponseError } from '@/modules/commons/entities';
import { TProblemStatementResponse } from '@/modules/master-data/problem-statements/entities';
import { useOptionVillages } from '@/modules/master-data/villages/utils';
import { TPredictProblemForm } from '@/modules/ml/entities';
import { usePredictProblemForm } from '@/modules/ml/utils';
import { useOwnDrawer } from '@/utils/helpers/modal';
import { setRequired } from '@/utils/helpers/validations';
import { UseQueryResult } from '@tanstack/react-query';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';

type PredictProblemDrawerProps = {
  villageId?: string;
  dataHook?: UseQueryResult<TPaginateResponse<TProblemStatementResponse>, TResponseError>;
};

export const PredictProblemDrawer: React.FC<PredictProblemDrawerProps> = (props) => {
  const { villageId, dataHook } = props;
  const router = useRouter();

  const drawer = useOwnDrawer();
  const { form, predictProblemMutation, onPredictProblem } = usePredictProblemForm();

  const onFinish = (values: TPredictProblemForm) => {
    if (villageId) values.villageId = villageId;

    onPredictProblem(values).then(() => {
      onClose();
      if (dataHook) dataHook.refetch();
      if (!villageId) router.push(`/dashboard/villages/${values.villageId}`);
    });
  };

  const onClose = () => {
    drawer.onTrigger();
    form.resetFields();
  };

  const { villageOptions, villageOptionDataHook } = useOptionVillages();

  return (
    <>
      <Button onClick={drawer.onTrigger}>Predict My Problem</Button>

      <Drawer title="Handle My Problem" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="text" label="My Problem" rules={[setRequired]}>
            <Input.TextArea placeholder="My Problem" />
          </Form.Item>

          {!villageId ? (
            <Form.Item name="villageId" label="Village" rules={[setRequired]}>
              <OwnSearchSelect
                options={villageOptions.options}
                onSearch={villageOptions.setSearch}
                fetching={villageOptionDataHook.isFetching}
                placeholder="Village"
              />
            </Form.Item>
          ) : null}

          <Form.Item>
            <Space align="end">
              <Button type="primary" htmlType="submit" loading={predictProblemMutation.isLoading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
