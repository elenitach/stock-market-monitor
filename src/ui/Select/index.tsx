import { FormControl, InputLabel, Select as SelectBase, MenuItem, SxProps } from "@mui/material";
import { useId } from "react";

export interface SelectItem<T> {
  label: string
  value: T
}

interface Props<T> {
  value: T;
  onChange: (value: T) => void;
  items: SelectItem<T>[];
  label: string;
  sx?: SxProps;
}

export const Select = <T extends string>({ value, onChange, items, label, sx }: Props<T>) => {
  const labelId = useId()

  return (
    <FormControl sx={sx}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <SelectBase
        labelId={labelId}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </SelectBase>
    </FormControl>
  );
};
