'use client';

import { OwnRow } from '@/components/atoms';
import { TAuthLoginForm } from '@/modules/auth/entities';
import { setRequired, setValidEmail } from '@/utils/helpers/validations';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Space } from 'antd';
import { signIn } from 'next-auth/react';
import { useRef } from 'react';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const [form] = Form.useForm<TAuthLoginForm>();

  const onFinish = async (values: TAuthLoginForm) => {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <>
      <PageContainer>
        <OwnRow>
          <Col lg={6}></Col>
          <Col span={24} lg={12}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[setRequired, setValidEmail]}>
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[setRequired]}>
                  <Input.Password placeholder="Password" />
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
  // return (
  //   <div
  //     className={'flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600'}
  //   >
  //     {searchParams?.message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.message}</p>}
  //     <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
  //       <Input onChange={(e) => (userName.current = e.target.value)} />
  //       <Input onChange={(e) => (pass.current = e.target.value)} />
  //       <Button onClick={onSubmit}>Login</Button>
  //     </div>
  //   </div>
  // );
};

export default LoginPage;
