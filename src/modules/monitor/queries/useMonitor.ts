import { QueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";

import { MonitorQueryKeys } from "./keys";
import { monitorApi } from "../api/methods";
import { Pagination } from "@/interfaces/api";

export const useMonitor = (params: Pagination) => {
  const state = useQuery({
    queryKey: [MonitorQueryKeys.Monitor, {...params}],
    queryFn: () => monitorApi.monitor(params),
    // refetchInterval: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return state;
};

export const prefetchMonitor = async (queryClient: QueryClient, params: Pagination) =>
  queryClient.prefetchQuery({
    queryKey: [MonitorQueryKeys.Monitor, { ...params }],
    queryFn: () => monitorApi.monitor(params),
  });
