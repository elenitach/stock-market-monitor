import { TextField } from "@mui/material";
import { FC, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MonitorSearch: FC<Props> = ({ onChange, value }) => {
  const [valueInternal, setValueInternal] = useState(value);

  const onChangeDebounced = useDebounceCallback(onChange, 300);

  const onChangeInternal = (value: string) => {
    setValueInternal(value);
    onChangeDebounced(value);
  };

  return (
    <TextField
      label="Поиск по символу"
      placeholder="Поиск..."
      value={valueInternal}
      onChange={(e) => onChangeInternal(e.target.value)}
    />
  );
};
