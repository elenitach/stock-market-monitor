"use client";

import { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/config/queryClient";


export const ReactQueryClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
