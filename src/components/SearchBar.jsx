import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/tasks/taskSlice";
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

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <StyledTextField
      label="Search Tasks"
      variant="outlined"
      fullWidth
      onChange={handleSearchChange}
      placeholder="Search by title or description..."
    />
  );
};

export default SearchBar;
