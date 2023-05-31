export type TResponseError = {
  statusCode: number;
  message: {
    field: string;
    error: string[];
  }[];
  errors?: string;
};

export type TResponseData<T> = {
  statusCode: 200;
  message: string;
  data: T;
};

export type TPaginateResponse<T> = TResponseData<T> & {
  meta: {
    currentPage: number;
    lastPage: number;
    next: string;
    perPage: number;
    prev: string;
    total: number;
  };
  data: T[];
};

export type TPaginateParams = {
  perPage?: number;
  page?: number;
  orderBy?: string;
  orderType?: 'asc' | 'desc';
  search?: string;
};

export type TPageProps = {
  params: {
    id: string;
  };
};
