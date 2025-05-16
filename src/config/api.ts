import { API_URL } from "@/constants/env";
import { stringify } from "qs";

interface RequestOptions {
  apiUrl?: string;
  path: string;
  params?: Record<string, any>;
  data?: BodyInit;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  cache?: RequestCache;
}

export const request = ({
  params,
  apiUrl,
  path,
  cache,
  ...options
}: RequestOptions) => {
  const paramsStr = stringify(params, { addQueryPrefix: true });
  const url = `${apiUrl ?? API_URL}${path}${paramsStr}`;

  return fetch(url, {
    body: JSON.stringify(options.data),
    cache: cache ?? "no-store",
    ...options,
  });
};
