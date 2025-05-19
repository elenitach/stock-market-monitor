import { Box, CircularProgress } from "@mui/material";

export const LoadingPanel = () => {
  return (
    <Box
      sx={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff99",
      }}
    >
      <CircularProgress color="info" />
    </Box>
  );
}