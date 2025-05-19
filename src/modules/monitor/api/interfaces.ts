import { ApiPlans } from "@/constants/api";
import { ApiArrayData, ApiObjectData, PageData, Pagination } from "@/interfaces/api";

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
}