'use client';

// import { PieChartOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Typography } from 'antd';
// import { MenuItemType } from 'antd/es/menu/hooks/useItems';
// import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const { Header, Content, Footer } = Layout;

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItemType[],
// ): MenuItemType {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItemType;
// }

// const menus: MenuItemType[] = [
//   getItem('Dashboard', '/dashboard', <PieChartOutlined />),
//   getItem('Region', '/dashboard/regions', <HomeOutlined />, [
//     getItem('Province', '/dashboard/regions/provinces'),
//     getItem('City', '/dashboard/regions/cities'),
//     getItem('District', '/dashboard/regions/districts'),
//     getItem('Sub District', '/dashboard/regions/sub-districts'),
//   ]),
// ];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  // const router = useRouter();
  // const pathname = usePathname();

  // const getOpenMenus = () => {
  //   const found = menus.filter((item) => pathname.includes(String(item.key))).pop();

  //   return [String(found?.key)];
  // };

  return (
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: 'dark', position: 'sticky' }}>
        <div style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography.Title level={4} style={{ color: 'White' }}>
            Amati
          </Typography.Title>
        </div>
      </Header>

      <Content style={{ margin: '44px 16px 418px', overflow: 'initial' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}
