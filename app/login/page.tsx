'use client';

import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Input, Typography, Space, Card } from 'antd';
import React from 'react';

export default () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: '25%',
            minWidth: '25%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography.Title level={4}>Admin Login</Typography.Title>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Input type="text" placeholder="Username" prefix={<UserOutlined />} />
            <Input type="password" placeholder="Password" prefix={<KeyOutlined />} />
            <Button type="primary" block>
              login
            </Button>
          </Space>
        </Card>
      </div>
    </>
  );
};
