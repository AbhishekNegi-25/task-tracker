import React from "react";

import { SearchField } from "../styles/StyledComponents";

const SearchBar = ({ onSearch }) => {
  return (
    <SearchField
      label="Search Tasks"
      variant="outlined"
      fullWidth
      onChange={onSearch}
      placeholder="Search by title or description..."
    />
  );
};

export default SearchBar;
