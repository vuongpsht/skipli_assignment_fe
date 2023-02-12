import React from "react";
import { useAuthCheck } from "../../hooks/useAuthFlow";
import { Box, CssBaseline } from "@mui/material";
import { AppBottom } from "./components/Bottom";
import { SearchInput } from "./components/SearchInput";
import { ListUser } from "./components/List";
export const Home = () => {
  useAuthCheck();
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <SearchInput />
      <ListUser />

      <AppBottom />
    </Box>
  );
};
