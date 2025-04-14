import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/taskSlice";
import { FaSearch, FaFilter } from "react-icons/fa";

export const TaskFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);

  return (
    <div className="filter-container">
      <div className="filter-section">
        <FaFilter className="filter-icon" />
        <select
          value={filters.status}
          onChange={(e) => dispatch(setFilter({ status: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className="filter-section">
        <select
          value={filters.priority}
          onChange={(e) => dispatch(setFilter({ priority: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="low" className="priority-option low">
            Low
          </option>
          <option value="medium" className="priority-option medium">
            Medium
          </option>
          <option value="high" className="priority-option high">
            High
          </option>
        </select>
      </div>

      <div className="search-section">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
          className="search-input"
        />
      </div>
    </div>
  );
};
