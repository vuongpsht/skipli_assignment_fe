import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Favorite, Search } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { homeLayoutAtom } from "../../../store/atoms/homeLayout";

export const AppBottom = () => {
  const [layout, setLayout] = useRecoilState(homeLayoutAtom);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={layout}
        onChange={(event, newValue) => {
          setLayout(newValue);
        }}
      >
        <BottomNavigationAction label="Search" icon={<Search />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
      </BottomNavigation>
    </Paper>
  );
};
