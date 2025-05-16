import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageContainer: FC<Props> = ({ children }) => {
  return (
    <Container component="main" maxWidth="lg">
      {children}
    </Container>
  );
};
