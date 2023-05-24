'use client';

import { ConfigProvider } from 'antd';
import locale from 'antd/locale/en_US';

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            colorPrimary: '#00b96b',
            fontFamily: `'Poppins', sans-serif`,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
  );
};
