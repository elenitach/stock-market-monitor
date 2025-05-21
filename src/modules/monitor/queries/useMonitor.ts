import { QueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";

import { MonitorQueryKeys } from "./keys";
import { monitorApi } from "../api/methods";
import { GetMonitorParams } from "../api/interfaces";
import { MONITOR_REFETCH_INTERVAL } from "../constants";

export const useMonitor = (params: GetMonitorParams) => {
  const state = useQuery({
    queryKey: [MonitorQueryKeys.Monitor, { ...params }],
    queryFn: () => monitorApi.monitor(params),
    refetchInterval: MONITOR_REFETCH_INTERVAL,
    placeholderData: keepPreviousData,
  });

  return state;
};

export const prefetchMonitor = async (
  queryClient: QueryClient,
  params: GetMonitorParams
) =>
  queryClient.prefetchQuery({
    queryKey: [MonitorQueryKeys.Monitor, { ...params }],
    queryFn: () => monitorApi.monitor(params),
  });
