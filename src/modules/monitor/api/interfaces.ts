import { ApiPlans } from "@/constants/api";
import { ApiArrayData, ApiObjectData, PageData, Pagination } from "@/interfaces/api";
import { StockTypes } from "../interfaces";

export type StockData = ApiArrayData<{
  symbol: string;
  access: {
    plan: ApiPlans;
  };
}>;

export type StockQuoteDataItem = {
  symbol: string;
  name: string;
  currency: string;
  is_market_open: boolean;
  open: string;
  close: string;
};

export type StockQuoteData =
  | StockQuoteDataItem
  | ApiObjectData<StockQuoteDataItem>;

export interface PriceDataItem {
  price: string;
}

export type PriceData = PriceDataItem | ApiObjectData<PriceDataItem>;

export type Stock = StockQuoteDataItem & PriceDataItem & {
  change: string
  changePercent: string
};

export type StockPageData = PageData<Stock>;

export interface GetMonitorParams extends Pagination {
  search?: string
  stockType: StockTypes
}

export interface GetTimeSeriesParams {
  symbol: string
}

export interface TimeSeriesData {
  values: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }[];
}
