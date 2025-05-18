import { ErrorResponse, PageData } from "@/interfaces/api";

export const getPageData = <T>(
  dataList: T[],
  page: number,
  perPage: number
) => {
  return {
    data: dataList.slice(perPage * (page - 1), perPage * page),
    meta: {
      page,
      perPage,
      total: dataList.length,
      pagesCount:
        Math.floor(dataList.length / perPage) +
        Number(Boolean(dataList.length % perPage)),
    },
  } as PageData<T>;
};

export const isErrorResponse = (response: Record<string, any>): response is ErrorResponse => {
  return 'message' in response
}
