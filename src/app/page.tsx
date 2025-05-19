import { getQueryClient } from "@/config/queryClient";
import { MonitorTable } from "@/modules/monitor/components/MonitorTable";
import { prefetchMonitor } from "@/modules/monitor/queries/useMonitor";
import { PageContainer } from "@/ui/PageContainer";
import { Typography } from "@mui/material";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await prefetchMonitor(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <Typography component="h1" marginBottom={3} variant="h3">
          Биржевой монитор
        </Typography>
        <MonitorTable />
      </PageContainer>
    </HydrationBoundary>
  );
}
