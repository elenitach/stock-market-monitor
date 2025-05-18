import { ApiPlans } from "@/constants/api";
import { ApiArrayData, ApiObjectData, PageData } from "@/interfaces/api";

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

export type Stock = StockQuoteDataItem & PriceDataItem;

export type StockPageData = PageData<Stock>;
