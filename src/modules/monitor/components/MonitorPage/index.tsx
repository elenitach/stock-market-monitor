"use client";

import { FC, useState, useEffect } from "react";
import { useMonitor } from "../../queries/useMonitor";
import { Typography, Box } from "@mui/material";
import { DEFAULT_PER_PAGE } from "@/constants/api";
import { MonitorSearch } from "../MonitorSearch";
import { StockTypeSelect } from "../StockTypeSelect";
import { StockTypes } from "../../interfaces";
import { MonitorTable } from "../MonitorTable";
import { PageContainer } from "@/ui/PageContainer";
import { invalidateTimeSeries } from "../../queries/useTimeSeries";

export const MonitorPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [stockType, setStockType] = useState(StockTypes.All);

  const { data, error, isPending, isFetching } = useMonitor({
    page,
    perPage: DEFAULT_PER_PAGE,
    ...(!!searchValue && { search: searchValue }),
    stockType,
  });

  useEffect(() => {
    invalidateTimeSeries();
  }, [data]);

  return (
    <PageContainer>
      <Typography component="h1" marginBottom={4} variant="h4">
        Биржевой монитор
      </Typography>
      {error && <Typography>{error.message}</Typography>}
      {data && (
        <Box>
          <Box display="flex" gap={3} marginBottom={4}>
            <MonitorSearch
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
            />
            <StockTypeSelect
              value={stockType}
              onChange={(value) => setStockType(value)}
            />
          </Box>
          <MonitorTable
            data={data}
            loading={isFetching || isPending}
            page={page}
            setPage={setPage}
          />
        </Box>
      )}
    </PageContainer>
  );
};
