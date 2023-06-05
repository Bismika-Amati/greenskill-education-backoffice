import { TPageProps } from '@/modules/commons/entities';
import { TInterviewRecapForm, TInterviewRecapResponse } from '@/modules/master-data/interview-recaps/entities';
import { useFetchInterviewRecaps } from '@/modules/master-data/interview-recaps/hooks';
import { useInterviewRecapForm } from '@/modules/master-data/interview-recaps/utils';
import { useOwnDrawer, showDeleteConfirm } from '@/utils/helpers/modal';
import { setRequired } from '@/utils/helpers/validations';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Button, Card, Drawer, Form, Input, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { useOwnPaginaiton, OwnTable } from '../tables';
import { setDefaultFormatDate } from '@/utils/helpers/date';
import dayjs from 'dayjs';

type InterviewRecapCardProps = TPageProps;

export const InterviewRecapCard: React.FC<InterviewRecapCardProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchInterviewRecaps({
    ...paginateParams,
  });

  const [activedId, setActivedId] = useState('');
  const drawer = useOwnDrawer();
  const { form, watchForm, onCreate, onUpdate, onDelete } = useInterviewRecapForm(activedId);

  const onFinish = (values: TInterviewRecapForm) => {
    console.log(values);
    values.problemStatementId = params.id;
    values.interviewDate = new Date(values.interviewDate);

    const onForm = activedId ? onUpdate(values) : onCreate(values);
    onForm.then(() => {
      onClose();
      dataHook.refetch();
    });
  };

  const onClose = () => {
    drawer.onTrigger();
    form.resetFields();
  };

  const onEdit = (data: TInterviewRecapResponse) => {
    setActivedId(data.id);
    drawer.onTrigger();
    form.setFieldsValue({
      ...data,
      interviewDate: dayjs(data.interviewDate),
    });
  };

  const onRemove = (data: TInterviewRecapResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(data.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TInterviewRecapResponse> = [
    {
      title: 'Name',
      dataIndex: 'intervieweeName',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button key={1} icon={<EditOutlined />} size="small" type="link" onClick={() => onEdit(record)} />
          <Button key={2} icon={<DeleteOutlined />} danger size="small" type="link" onClick={() => onRemove(record)} />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Interview Recaps"
      extra={
        <Button type="primary" onClick={drawer.onTrigger}>
          Add Item
        </Button>
      }
    >
      <OwnTable
        loading={dataHook.isFetching}
        columns={columns}
        dataSource={dataHook.data?.data}
        meta={dataHook.data?.meta}
        onChange={onChangePaginateParams}
      />

      <Drawer title="Handle Interview Recap" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="intervieweeName" label="Interviewee Name" rules={[setRequired]}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input value={watchForm?.intervieweeName} placeholder="Interviewee Name" style={{ width: '100%' }} />
              <Button
                onClick={async () => {
                  const session = await getSession();
                  form.setFieldValue('intervieweeName', session?.user.user.fullname);
                }}
              >
                Set as me
              </Button>
            </div>
          </Form.Item>

          <Form.Item name="interviewDate" label="Interview Date" rules={[setRequired]}>
            {JSON.stringify(watchForm)}
            {/* <DatePicker placeholder="Interview Date" style={{ width: '100%' }} /> */}
          </Form.Item>

          <Form.Item label="Problems">
            <Button>Add Problem</Button>
          </Form.Item>

          <Form.Item>
            <Space align="end">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
};
