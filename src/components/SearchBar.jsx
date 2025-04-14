import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
  },
}));

const SearchBar = ({ onSearch }) => {
  return (
    <StyledTextField
      label="Search Tasks"
      variant="outlined"
      fullWidth
      onChange={onSearch}
      placeholder="Search by title or description..."
    />
  );
};

export default SearchBar;
