import { PriceData, PriceDataItem, StockQuoteData, StockQuoteDataItem } from "../api/interfaces";

export const isStockQuoteDataItem = (item: StockQuoteData): item is StockQuoteDataItem => {
  return 'symbol' in item
}

export const isPriceDataItem = (item: PriceData): item is PriceDataItem => {
  return 'price' in item
}
