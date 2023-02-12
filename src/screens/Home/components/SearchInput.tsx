import React, { FormEventHandler } from "react";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { github } from "../../../api/githubApi";
const $containerStyle = {
  display: "flex",
  alignItems: "flex-end",
  alignSelf: "center",
  justifyContent: "center",
  marginTop: 1,
};
const $search = { color: "action.active", mr: 1, my: 0.5 };

export const SearchInput = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const search = data.get("search")?.toString();
    github.GET("search/users", { q: search }).then(console.log);
  };
  return (
    <Box sx={$containerStyle}>
      <Search sx={$search} />
      <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          id="search"
          name="search"
          label="Search here"
          variant="standard"
        />
      </Box>
    </Box>
  );
};
