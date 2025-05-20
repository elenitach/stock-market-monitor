import { getQueryClient } from "@/config/queryClient";
import { DEFAULT_PER_PAGE } from "@/constants/api";
import { MonitorPage } from "@/modules/monitor/components/MonitorPage";
import { StockTypes } from "@/modules/monitor/interfaces";
import { prefetchMonitor } from "@/modules/monitor/queries/useMonitor";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await prefetchMonitor(queryClient, { page: 1, perPage: DEFAULT_PER_PAGE, stockType: StockTypes.All });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MonitorPage />
    </HydrationBoundary>
  );
}
