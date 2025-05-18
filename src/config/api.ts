import { ApiErrorMessages } from "@/constants/api";
import { stringify } from "qs";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface RequestOptions {
  apiUrl: string;
  path: string;
  params?: Record<string, any> | string;
  data?: BodyInit;
  headers?: HeadersInit;
  cache?: RequestCache;
}

const request = async <TData>({
  params,
  apiUrl,
  path,
  cache,
  headers,
  ...options
}: RequestOptions & {
  method: Method;
}) => {
  const paramsStr = typeof params === 'string' ? `?${params}` : stringify(params, { addQueryPrefix: true, arrayFormat: "comma" });
  const url = `${apiUrl}${path}${paramsStr}`;

  return fetch(url, {
    body: JSON.stringify(options.data),
    cache: cache ?? "no-store",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  }).then(async (res) => {
    const data = await res.json();
    if (['4', '5'].includes(`${res.status}`[0]) || (['4', '5'].includes(`${data.code}`[0]))) {
      return {
        code: data.code as number,
        message: data.message as string,
      };
    }
    return {
      data: data as TData,
    };
  }).catch(() => {
    return {
      code: 500,
      message: ApiErrorMessages.FetchDataError
    }
  });
};

export const api = {
  get: <T>(options: RequestOptions) =>
    request<T>({ method: "GET", ...options }),
  post: <T>(options: RequestOptions) =>
    request<T>({ method: "POST", ...options }),
  put: <T>(options: RequestOptions) =>
    request<T>({ method: "PUT", ...options }),
  patch: <T>(options: RequestOptions) =>
    request<T>({ method: "PATCH", ...options }),
  delete: <T>(options: RequestOptions) =>
    request<T>({ method: "DELETE", ...options }),
};
