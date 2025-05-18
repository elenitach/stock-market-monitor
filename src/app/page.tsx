import { monitorApi } from "@/modules/monitor/api/methods";
import { PageContainer } from "@/ui/PageContainer";

export default async function Home() {
  const data = await monitorApi.monitor()
  console.log(data)
  return <PageContainer>page</PageContainer>;
}
