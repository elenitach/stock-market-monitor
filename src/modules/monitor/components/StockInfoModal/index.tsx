import { Modal } from "@/ui/Modal";
import { FC } from "react";
import { useTimeSeries } from "../../queries/useTimeSeries";
import { LoadingPanel } from "@/ui/LoadingPanel";
import { Box } from "@mui/material";

interface Props {
  onClose: () => void;
  symbol: string;
}

export const StockInfoModal: FC<Props> = ({ onClose, symbol }) => {
  const { isLoading } = useTimeSeries({ symbol });

  return (
    <Modal
      title={`Стоимость акции ${symbol}`}
      onClose={onClose}
      open={!!symbol}
      slotProps={{ paper: { sx: { minWidth: 500 } } }}
    >
      <Box sx={{ position: "relative", minHeight: 400 }}>
        {isLoading && <LoadingPanel />}
      </Box>
    </Modal>
  );
};
