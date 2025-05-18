import { NextRequest } from "next/server";
import { api } from "@/config/api";
import { API_URL, TWELVE_DATA_API_KEY } from "@/constants/env";
import { ApiPlans, DEFAULT_PER_PAGE } from "@/constants/api";
import { getPageData, isErrorResponse } from "@/helpers/api";
import { monitorEndpoints } from "@/modules/monitor/api/endpoints";
import {
  PriceData,
  StockData,
  StockPageData,
  StockQuoteData,
} from "@/modules/monitor/api/interfaces";
import {
  isPriceDataItem,
  isStockQuoteDataItem,
} from "@/modules/monitor/helpers/typeGuards";

export async function GET(request: NextRequest) {
  const {
    page: pageParam,
    perPage: perPageParam,
    ...otherParams
  } = Object.fromEntries(request.nextUrl.searchParams.entries());
  const page = Number(pageParam ?? 1);
  const perPage = Number(perPageParam ?? DEFAULT_PER_PAGE);

  const stocksResponse = await api.get<StockData>({
    apiUrl: API_URL,
    path: monitorEndpoints.stocks(),
    params: { ...otherParams, show_plan: true, apikey: TWELVE_DATA_API_KEY },
    cache: "force-cache",
  });

  if (isErrorResponse(stocksResponse)) {
    return Response.json(stocksResponse);
  }

  const availableData = stocksResponse.data.data.filter(item => item.access.plan === ApiPlans.Basic)

  const pageData = getPageData(availableData, page, perPage);

  const symbols = pageData.data.map((item) => item.symbol);

  const quotesPromise = api.get<StockQuoteData>({
    apiUrl: API_URL,
    path: monitorEndpoints.quote(),
    params: { symbol: symbols, apikey: TWELVE_DATA_API_KEY },
  });

  const currentPricesPromise = api.get<PriceData>({
    apiUrl: API_URL,
    path: monitorEndpoints.price(),
    params: { symbol: symbols, apikey: TWELVE_DATA_API_KEY },
  });

  const [quotesResponse, currentPricesResponse] = await Promise.all([
    quotesPromise,
    currentPricesPromise,
  ]);

  if (isErrorResponse(quotesResponse)) {
    return Response.json(quotesResponse)
  }

  if (isErrorResponse(currentPricesResponse)) {
    return Response.json(currentPricesResponse);
  }

  return Response.json({
    data: symbols.map((item) => {
      const quote = isStockQuoteDataItem(quotesResponse.data)
        ? quotesResponse.data
        : quotesResponse.data[item];

      const price = isPriceDataItem(currentPricesResponse.data)
        ? currentPricesResponse.data
        : currentPricesResponse.data[item];

      return { ...quote, ...price };
    }),
    meta: pageData.meta,
  } as StockPageData);
}
