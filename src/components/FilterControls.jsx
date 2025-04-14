import React from "react";
import {
  StyledToggleButton,
  StyledToggleButtonGroup,
  StyledPaper,
} from "./StyledComponents";

const FilterControls = ({ onFilter, filter }) => {
  return (
    <StyledPaper>
      <StyledToggleButtonGroup
        value={filter}
        exclusive
        onChange={onFilter}
        fullWidth
      >
        <StyledToggleButton selected={filter === "all"} value="all">
          All
        </StyledToggleButton>
        <StyledToggleButton selected={filter === "active"} value="active">
          Active
        </StyledToggleButton>
        <StyledToggleButton selected={filter === "completed"} value="completed">
          Completed
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </StyledPaper>
  );
};

export default FilterControls;
