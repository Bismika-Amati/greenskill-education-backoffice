import { TPageProps } from '@/modules/commons/entities';
import { Button, Card, Drawer, Form, Input, InputNumber, Space } from 'antd';
import { OwnTable, useOwnPaginaiton } from '../tables';
import { showDeleteConfirm, useOwnDrawer } from '@/utils/helpers/modal';
import { useState } from 'react';
import { useFetchSubModules } from '@/modules/master-data/sub-modules/hooks';
import { useSubModuleForm } from '@/modules/master-data/sub-modules/utils';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { TSubModuleForm, TSubModuleResponse } from '@/modules/master-data/sub-modules/entities';
import { setRequired } from '@/utils/helpers/validations';
import { FilePlace } from '@/modules/media/enums';
import { OwnUpload } from '@/components/atoms/inputs/OwnUpload';
import { ArticleSubModuleCard } from './ArticleSubModuleCard';

type SubModuleCardProps = TPageProps;

export const SubModuleCard: React.FC<SubModuleCardProps> = (props) => {
  const { params } = props;

  const { paginateParams, onChangePaginateParams } = useOwnPaginaiton();
  const dataHook = useFetchSubModules(
    {
      ...paginateParams,
      orderBy: 'number',
      courseId: params.id,
    },
    {
      enabled: !!params.id,
    },
  );

  const [activedId, setActivedId] = useState('');
  const drawer = useOwnDrawer();
  const { form, watchForm, setForm, onCreate, onUpdate, onDelete, createMutation, updateMutation, deleteMutation } =
    useSubModuleForm(activedId);

  const onFinish = (values: TSubModuleForm) => {
    values.courseId = params.id;
    values.description = values.description || '';
    values.picture = values.picture || '';
    values.video = values.video || '';

    const onForm = activedId ? onUpdate(values) : onCreate(values);
    onForm.then(() => {
      onClose();
      dataHook.refetch();
    });
  };

  const onClose = () => {
    setActivedId('');
    drawer.onTrigger();
    form.resetFields();
  };

  const onEdit = (values: TSubModuleResponse) => {
    setActivedId(values.id);
    drawer.onTrigger();
    setForm(values);
  };

  const onRemove = (values: TSubModuleResponse) => {
    showDeleteConfirm({
      onOk: () => {
        onDelete(values.id).then(() => {
          dataHook.refetch();
        });
      },
    });
  };

  const columns: ColumnsType<TSubModuleResponse> = [
    {
      title: 'Number',
      dataIndex: 'number',
      width: 100,
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            key={1}
            icon={<EditOutlined />}
            size="small"
            type="link"
            onClick={() => onEdit(record)}
            loading={updateMutation.isLoading}
          />
          <Button
            key={2}
            icon={<DeleteOutlined />}
            danger
            size="small"
            type="link"
            onClick={() => onRemove(record)}
            loading={deleteMutation.isLoading}
          />
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record: TSubModuleResponse) => {
    return <ArticleSubModuleCard params={{ ...params, id: record.id }} />;
  };

  return (
    <Card
      title="Sub Modules"
      extra={
        <Button type="primary" onClick={drawer.onTrigger} loading={createMutation.isLoading}>
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
        expandable={{ expandedRowRender }}
      />

      <Drawer title="Handle Existing Alternative" open={drawer.open} onClose={onClose}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="number" label="Number" rules={[setRequired]}>
            <InputNumber placeholder="Number" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="title" label="Title" rules={[setRequired]}>
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item name="picture" label="Picture">
            <OwnUpload
              filePlace={FilePlace.SubModulePicture}
              defaultFile={watchForm?.picture}
              onUploaded={(filename) => form.setFieldValue('picture', filename)}
            />
          </Form.Item>

          <Form.Item name="video" label="Video">
            <Input placeholder="Video" />
          </Form.Item>

          <Form.Item>
            <Space align="end">
              <Button type="primary" htmlType="submit" loading={updateMutation.isLoading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
};
