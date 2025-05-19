"use client";

import { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useMonitor } from "../../queries/useMonitor";
import { TablePagination } from "@mui/material";
import { DEFAULT_PER_PAGE } from "@/constants/api";
import { LoadingPanel } from "@/ui/LoadingPanel";

export const MonitorTable: FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isFetching } = useMonitor({
    page,
    perPage: DEFAULT_PER_PAGE,
  });

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (!data) {
    return null;
  }

  return (
    <Paper>
      <TableContainer sx={{ position: "relative" }}>
        {(isPending || isFetching) && <LoadingPanel />}
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
            {data.data.map((row) => (
              <TableRow key={row.name}>
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
      <TablePagination
        component="div"
        count={data.meta.total}
        rowsPerPage={DEFAULT_PER_PAGE}
        page={page - 1}
        onPageChange={(_, newPage) => setPage(newPage + 1)}
        rowsPerPageOptions={[DEFAULT_PER_PAGE]}
      />
    </Paper>
  );
};
