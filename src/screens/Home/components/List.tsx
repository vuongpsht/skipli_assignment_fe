import React from "react";
import { Box, Pagination } from "@mui/material";

export const ListUser = () => {
  return (
    <Box
      sx={{ justifyContent: "center", display: "flex", alignSelf: "center" }}
    >
      <Pagination count={1} shape="rounded" />
    </Box>
  );
};
