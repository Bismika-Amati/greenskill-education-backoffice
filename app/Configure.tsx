'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/en_US';

export default ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
};
