import { SelectItem } from "@/ui/Select";
import { StockTypes } from "../interfaces";

export const DEFAULT_EXCHANGE = "NASDAQ";
export const DEFAULT_TIME_INTERVAL = "1day";

export const stockTypeItems: SelectItem<StockTypes>[] = [
  { label: "Все", value: StockTypes.All },
  { label: "Растущие", value: StockTypes.Increasing },
  { label: "Падающие", value: StockTypes.Decreasing },
];
