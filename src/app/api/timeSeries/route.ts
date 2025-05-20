import { NextRequest } from "next/server";
import { api } from "@/config/api";
import { API_URL, TWELVE_DATA_API_KEY } from "@/constants/env";
import { monitorEndpoints } from "@/modules/monitor/api/endpoints";
import { TimeSeriesData } from "@/modules/monitor/api/interfaces";
import { SuccessResponse } from "@/interfaces/api";
import { DEFAULT_TIME_INTERVAL } from "@/modules/monitor/constants";

export async function GET(request: NextRequest) {
  const { symbol } = Object.fromEntries(request.nextUrl.searchParams.entries());

  let response: SuccessResponse<TimeSeriesData>;
  try {
    response = await api.get<TimeSeriesData>({
      apiUrl: API_URL,
      path: monitorEndpoints.timeSeries(),
      params: {
        symbol,
        interval: DEFAULT_TIME_INTERVAL,
        apikey: TWELVE_DATA_API_KEY,
      },
    });
  } catch (error) {
    return Response.json(error);
  }

  return Response.json(response.data);
}
