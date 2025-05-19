import { QueryClient, useQuery } from "@tanstack/react-query";

import { MonitorQueryKeys } from "./keys";
import { monitorApi } from "../api/methods";

export const useMonitor = () => {
  const { data, error } = useQuery({
    queryKey: [MonitorQueryKeys.Monitor],
    queryFn: monitorApi.monitor,
    refetchInterval: 60 * 1000
  });

  return {
    data,
    error,
  };
};

export const prefetchMonitor = async (queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: [MonitorQueryKeys.Monitor],
    queryFn: monitorApi.monitor,
  });
