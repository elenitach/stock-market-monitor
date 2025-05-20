"use client";

import { FC, Dispatch, SetStateAction, useState } from "react";
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DEFAULT_PER_PAGE } from "@/constants/api";
import { LoadingPanel } from "@/ui/LoadingPanel";
import { StockPageData } from "../../api/interfaces";
import { PriceChangeCell } from "./cells/PriceChangeCell";
import { StockInfoModal } from "../StockInfoModal";

interface Props {
  data: StockPageData;
  loading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const MonitorTable: FC<Props> = ({ data, loading, page, setPage }) => {
  const [symbol, setSymbol] = useState<string | null>(null);

  return (
    <Paper>
      <TableContainer sx={{ position: "relative" }}>
        {loading && <LoadingPanel />}
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
              <TableRow
                key={row.symbol}
                sx={{cursor: 'pointer'}}
                onClick={() => {
                  setSymbol(row.symbol);
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.price}</TableCell>
                <PriceChangeCell value={row.change} />
                <PriceChangeCell value={row.changePercent} />
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
      {symbol && (
        <StockInfoModal onClose={() => setSymbol(null)} symbol={symbol} />
      )}
    </Paper>
  );
};
