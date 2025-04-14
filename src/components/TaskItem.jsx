import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Checkbox,
  IconButton,
  Chip,
  Box,
  TextField,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {
  deleteTask,
  toggleComplete,
  updateTask,
} from "../features/tasks/taskSlice";

const StyledCard = styled(Paper)(({ theme, completed }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[0.1],
  backgroundColor: completed
    ? theme.palette.action.selected
    : theme.palette.background.paper,
}));

const priorityLabels = [
  {
    color: "#d32f2f",
    label: "High",
  },
  {
    color: "#ffa000",
    label: "Medium",
  },
  {
    color: "#388e3c",
    label: "Low",
  },
];

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleUpdate = () => {
    dispatch(
      updateTask({
        id: task.id,
        title: editTitle,
        description: editDescription,
      })
    );
    setIsEditing(false);
  };

  return (
    <StyledCard sx={{ width: "100%" }} completed={task.completed}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="flex-start"
          gap={2}
        >
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
            sx={{ mt: isEditing ? "6px" : "2px" }}
          />
          <Box flexGrow={1}>
            {isEditing ? (
              <Stack spacing={1}>
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder="Title"
                />
                <TextField
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  fullWidth
                  multiline
                  size="small"
                  placeholder="Description"
                  minRows={2}
                />
              </Stack>
            ) : (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    fontWeight: 600,
                    wordBreak: "break-word",
                  }}
                >
                  {task.title}
                  <Chip
                    label={task.priority}
                    size="small"
                    variant="outlined"
                    sx={(theme) => {
                      const priorityData = priorityLabels.find(
                        (item) => item.label === task.priority
                      );
                      const color =
                        priorityData?.color || theme.palette.text.primary;

                      return {
                        marginLeft: 1,
                        color: color,
                        borderColor: color,
                        backgroundColor: `${color}20`,
                        fontWeight: 500,
                        "& .MuiChip-label": {
                          paddingLeft: "6px",
                          paddingRight: "6px",
                        },
                      };
                    }}
                  />
                </Typography>
                {task.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                      wordBreak: "break-word",
                    }}
                  >
                    {task.description}
                  </Typography>
                )}
              </>
            )}
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box display="flex" flexDirection="column" gap={0.5}>
              {isEditing ? (
                <>
                  <IconButton
                    onClick={handleUpdate}
                    color="primary"
                    size="small"
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditing(false)}
                    color="error"
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => setIsEditing(true)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(deleteTask(task.id))}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {task.categories?.length > 0 && (
          <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
            {task.categories.map((category, index) => {
              return (
                <Chip
                  key={`${category.label}-${index}`}
                  label={category.label}
                  size="small"
                  sx={{
                    backgroundColor: category.color,
                    color: "white",
                    borderColor: category.color,
                  }}
                  variant="outlined"
                />
              );
            })}
          </Stack>
        )}
      </Box>
    </StyledCard>
  );
};

export default TaskItem;
