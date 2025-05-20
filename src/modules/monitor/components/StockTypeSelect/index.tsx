import { Select } from "@/ui/Select";
import { FC } from "react";
import { stockTypeItems } from "../../constants";
import { StockTypes } from "../../interfaces";

interface Props {
  value: StockTypes;
  onChange: (value: StockTypes) => void;
}

export const StockTypeSelect: FC<Props> = ({ value, onChange }) => {
  return (
    <Select<StockTypes>
      items={stockTypeItems}
      label="Тип акций"
      value={value}
      onChange={onChange}
      sx={{ width: "150px" }}
    />
  );
};
