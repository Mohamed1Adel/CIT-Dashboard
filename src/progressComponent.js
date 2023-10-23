import { Box, CircularProgress } from "@mui/material";

export const Progress = () => {
  return (
    <Box sm={{ width:"60px", display: "flex"}}>
      <CircularProgress />
    </Box>
  );
};
