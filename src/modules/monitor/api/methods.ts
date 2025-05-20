import { api } from "@/config/api";
import { GetMonitorParams, GetTimeSeriesParams, StockPageData, TimeSeriesData } from "./interfaces";
import { BASE_URL } from "@/constants/env";
import { DEFAULT_EXCHANGE } from "../constants";

const monitor = async (params: GetMonitorParams) => {
  const { data } = await api.get<StockPageData>({
    apiUrl: BASE_URL,
    path: "/api/monitor",
    params: {
      exchange: DEFAULT_EXCHANGE,
      ...params,
    },
  });

  return data;
};

const timeSeries = async (params: GetTimeSeriesParams) => {
  const { data } = await api.get<TimeSeriesData>({
    apiUrl: BASE_URL,
    path: "/api/timeSeries",
    params,
  });

  return data;
};

export const monitorApi = {
  monitor,
  timeSeries
};
