"use client";

import { FC, useState } from "react";
import { useMonitor } from "../../queries/useMonitor";
import { Typography, Box } from "@mui/material";
import { DEFAULT_PER_PAGE } from "@/constants/api";
import { MonitorSearch } from "../MonitorSearch";
import { StockTypeSelect } from "../StockTypeSelect";
import { StockTypes } from "../../interfaces";
import { MonitorTable } from "../MonitorTable";
import { PageContainer } from "@/ui/PageContainer";

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

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (!data) {
    return null;
  }

  return (
    <PageContainer>
      <Typography component="h1" marginBottom={3} variant="h3">
        Биржевой монитор
      </Typography>
      <Box>
        <Box display="flex" gap={3} marginBottom={2}>
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
    </PageContainer>
  );
};
