export interface PageData<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    pagesCount: number;
  };
}

export interface ApiArrayData<T> {
  data: T[];
  count: number;
  status: string;
}

export type ApiObjectData<T> = Record<string, T>

export interface ErrorResponse {
  message: string
  code: number
}

export interface SuccessResponse<T> {
  data: T
}

export interface Pagination {
  page: number
  perPage: number
}