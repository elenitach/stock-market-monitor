import { TableCell } from "@mui/material";
import { FC } from "react";

interface Props {
  value: string;
}

export const PriceChangeCell: FC<Props> = ({ value }) => {
  const isPositive = parseFloat(value) > 0;
  const formattedValue = isPositive ? `+${value}` : value;
  return (
    <TableCell sx={{ color: isPositive ? "green" : "red" }}>
      {formattedValue}
    </TableCell>
  );
};
