"use client";

import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useMonitor } from "../../queries/useMonitor";

export const MonitorTable: FC = () => {
  const { data, error } = useMonitor();

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Символ</TableCell>
            <TableCell>Текущая цена</TableCell>
            <TableCell>Изм. цены за день</TableCell>
            <TableCell>Изм. цены за день (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.change}</TableCell>
              <TableCell>{row.changePercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
