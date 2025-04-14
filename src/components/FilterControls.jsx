import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/taskSlice";
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "auto",
  padding: theme.spacing(1),
  border: "none",
  borderRadius: theme.shape.borderRadius,
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
}));

const FilterControls = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  return (
    <StyledPaper>
      <StyledToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        fullWidth
      >
        <StyledToggleButton value="all">All</StyledToggleButton>
        <StyledToggleButton value="active">Active</StyledToggleButton>
        <StyledToggleButton value="completed">Completed</StyledToggleButton>
      </StyledToggleButtonGroup>
    </StyledPaper>
  );
};

export default FilterControls;
