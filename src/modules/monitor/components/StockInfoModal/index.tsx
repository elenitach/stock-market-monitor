"use client";

import { Modal } from "@/ui/Modal";
import { FC } from "react";
import { useTimeSeries } from "../../queries/useTimeSeries";
import { LoadingPanel } from "@/ui/LoadingPanel";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  onClose: () => void;
  symbol: string;
}

export const StockInfoModal: FC<Props> = ({ onClose, symbol }) => {
  const { data, isLoading, error } = useTimeSeries({ symbol });

  const priceData = {
    values: data?.values.map((item) => Number(item.close)) ?? [],
    times: data?.values.map((item) => new Date(item.datetime).getTime()) ?? [],
  };

  const series = [
    {
      name: "Цена закрытия",
      type: "area",
      data: priceData.values,
    },
  ];

  const options = {
    chart: {
      type: "area",
      zoom: {
        type: "x",
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: priceData.times,
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        labels: {
          formatter: function (val: number) {
            return val;
          },
        },
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 70, 100],
      },
    },
  };

  return (
    <Modal
      title={`Стоимость акции ${symbol}`}
      onClose={onClose}
      open={!!symbol}
      slotProps={{
        paper: {
          sx: {
            minWidth: 500,
            minHeight: 400,
            position: "relative",
            padding: 2,
            overflow: "hidden",
          },
        },
      }}
    >
      {isLoading && <LoadingPanel />}
      {error && error.message}
      {data && <Chart type="area" options={options as any} series={series} />}
    </Modal>
  );
};
