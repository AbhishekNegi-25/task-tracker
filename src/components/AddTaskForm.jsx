import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import {
  TextField,
  Box,
  InputLabel,
  MenuItem,
  Chip,
  useMediaQuery,
  Autocomplete,
  useTheme,
} from "@mui/material";
import {
  StyledBox,
  StyledTextField,
  StyledSelect,
  StyledTypography,
  FormButton,
} from "../styles/StyledComponents";

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const suggestedCategories = [
  { label: "Work", color: "#017BFE" },
  { label: "Meeting", color: "#FF6B6B" },
  { label: "Documentation", color: "#FFD93D" },
  { label: "Shopping", color: "#4ECDC4" },
  { label: "Home", color: "#A29BFE" },
  { label: "Fitness", color: "#00B894" },
  { label: "Today", color: "#E17055" },
  { label: "Time-Sensitive", color: "#FF9F1C" },
  { label: "High Priority", color: "#EF233C" },
  { label: "Low Priority", color: "#70C1B3" },
  { label: "Development", color: "#6C5CE7" },
  { label: "Bug Fix", color: "#E63946" },
];

const AddTaskForm = ({ closeDialog }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedCategories = categories.map((cat) =>
      typeof cat === "string" ? { label: cat, color: "#888" } : cat
    );

    dispatch(
      addTask({
        title,
        description,
        priority,
        categories: formattedCategories,
      })
    );
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategories([]);
    closeDialog();
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(
      categories.filter((category) =>
        typeof category === "string"
          ? category !== categoryToDelete
          : category.label !== categoryToDelete.label
      )
    );
  };
  return (
    <StyledBox component="form" onSubmit={handleSubmit}>
      <StyledTextField
        label="Task Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <StyledTextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={isMobile ? 2 : 3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <InputLabel id="priority-label">Priority</InputLabel>
      <StyledSelect
        labelId="priority-label"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
      >
        {priorityOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box display="flex" alignItems="center">
              <Box ml={1}>{option.label}</Box>
            </Box>
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledTypography variant="subtitle2">Categories</StyledTypography>

      <Autocomplete
        multiple
        freeSolo
        options={suggestedCategories}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.label
        }
        value={categories}
        onChange={(event, newValue) => setCategories(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Add categories"
            placeholder="Select or type a new category"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={typeof option === "string" ? option : option.label}
              label={typeof option === "string" ? option : option.label}
              onDelete={() => handleDeleteCategory(option)}
              sx={{
                backgroundColor:
                  typeof option === "string" ? "#888" : option.color,
                color: "#fff",
                borderRadius: 1,
                m: 0.5,
              }}
            />
          ))
        }
      />

      <FormButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        isMobile={isMobile}
      >
        Add Task
      </FormButton>
    </StyledBox>
  );
};

export default AddTaskForm;
