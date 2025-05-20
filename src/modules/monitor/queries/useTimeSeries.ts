import { useQuery } from "@tanstack/react-query";

import { MonitorQueryKeys } from "./keys";
import { monitorApi } from "../api/methods";
import { GetTimeSeriesParams } from "../api/interfaces";

export const useTimeSeries = (params: GetTimeSeriesParams) => {
  const state = useQuery({
    queryKey: [MonitorQueryKeys.TimeSeries, { ...params }],
    queryFn: () => monitorApi.timeSeries(params),
    refetchOnMount: true,
  });

  return state;
};

