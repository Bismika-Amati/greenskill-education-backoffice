import React, { useState } from 'react';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/es/table';
import { TPaginateResponse } from '@/modules/commons/entities';

type OwnTableProps<T> = TableProps<T> & {
  meta?: TPaginateResponse<T>['meta'];
};

export const OwnTable = <T extends { id: string }>(props: OwnTableProps<T>): JSX.Element => {
  const { meta, dataSource, ...rest } = props;

  const showTotal = (total: number, range: [number, number]) => `${range[0]} - ${range[1]} out of ${total} data show`;

  return (
    <>
      <Table
        dataSource={dataSource}
        rowKey={(record) => record?.id?.toString()}
        pagination={
          meta
            ? {
                current: meta?.currentPage,
                pageSize: meta?.perPage,
                total: meta?.total,

                pageSizeOptions: PAGE_SIZE_OPTIONS,
                showSizeChanger: true,
                showTotal,
              }
            : false
        }
        {...rest}
      />
    </>
  );
};

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const useOwnPaginaiton = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZE_OPTIONS[0]);

  const onChangePaginateParams = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setPerPage(pagination.pageSize || PAGE_SIZE_OPTIONS[0]);
  };

  return {
    paginateParams: {
      page,
      perPage,
    },
    onChangePaginateParams,
  };
};
