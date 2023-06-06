'use client';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  HomeOutlined,
  GlobalOutlined,
  KeyOutlined,
  UserOutlined,
  PaperClipOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Layout, theme, Menu, Typography, Button } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[],
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemType;
}

const menus: MenuItemType[] = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Course', '/dashboard/courses', <FileOutlined />),
  getItem('Village', '/dashboard/villages', <HomeOutlined />),
  getItem('Problem Statement', '/dashboard/problem-statements', <PaperClipOutlined />),
  getItem('Region', '/dashboard/regions', <GlobalOutlined />, [
    getItem('Province', '/dashboard/regions/provinces'),
    getItem('City', '/dashboard/regions/cities'),
    getItem('District', '/dashboard/regions/districts'),
    getItem('Sub District', '/dashboard/regions/sub-districts'),
  ]),
  getItem('Role', '/dashboard/roles', <KeyOutlined />),
  getItem('User', '/dashboard/users', <UserOutlined />),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const pathname = usePathname();

  const getOpenMenus = () => {
    const found = menus.filter((item) => pathname?.includes(String(item.key))).pop();

    return [String(found?.key)];
  };

  return (
    <Layout hasSider>
      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography.Title level={4} style={{ color: 'white' }}>
              Amati
            </Typography.Title>
          </div>

          <div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[pathname ?? '']}
              defaultOpenKeys={getOpenMenus()}
              items={menus || []}
              onClick={(item) => {
                router.push(item.key);
              }}
            />
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, position: 'sticky' }}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem 0 0' }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />

            <Button onClick={signOut}>Logout</Button>
          </div>
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>Amati Indonesia ©2023 Created by Bismika</Footer>
      </Layout>
    </Layout>
  );
}
