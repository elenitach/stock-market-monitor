import { Dialog, DialogTitle, DialogProps } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props extends DialogProps {
  children: ReactNode;
  title: string;
}

export const Modal: FC<Props> = ({ children, title, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
