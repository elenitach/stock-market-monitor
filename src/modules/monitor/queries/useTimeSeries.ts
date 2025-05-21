import { useQuery } from "@tanstack/react-query";

import { MonitorQueryKeys } from "./keys";
import { monitorApi } from "../api/methods";
import { GetTimeSeriesParams } from "../api/interfaces";
import { getQueryClient } from "@/config/queryClient";

export const useTimeSeries = (params: GetTimeSeriesParams) => {
  const state = useQuery({
    queryKey: [MonitorQueryKeys.TimeSeries, { ...params }],
    queryFn: () => monitorApi.timeSeries(params),
  });

  return state;
};

export const invalidateTimeSeries = () => {
  const queryClient = getQueryClient();
  queryClient.invalidateQueries({ queryKey: [MonitorQueryKeys.TimeSeries] });
};
