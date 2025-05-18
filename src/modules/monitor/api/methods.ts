import { api } from "@/config/api";
import { StockPageData } from "./interfaces";
import { BASE_URL } from "@/constants/env";
import { DEFAULT_EXCHANGE } from "../constants";

const monitor = async () => {
  const response = await api.get<StockPageData>({
    apiUrl: BASE_URL,
    path: "/api/monitor",
    params: {
      exchange: DEFAULT_EXCHANGE,
    },
  });

  return response;
};

export const monitorApi = {
  monitor,
};
