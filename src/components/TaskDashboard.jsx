import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  SearchBar,
  FilterControls,
  AddTaskForm,
  TaskList,
  TaskCompletionStats,
} from "./index";
import {
  DashboardContainer,
  SectionPaper,
  HeaderSection,
  ContentRow,
  LeftColumn,
  RightColumn,
  TaskListContainer,
  StyledButton,
} from "./StyledComponents";
import {
  deleteTask,
  toggleComplete,
  updateTask,
  setSearchQuery,
  setFilter,
} from "../features/tasks/taskSlice";
import { generateCSV } from "../utils/helpers";

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery, reorderTasks } = useSelector(
    (state) => state.tasks
  );

  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const handleImport = (event) => {};

  const handleExport = () => {
    const headers = ["Task Name", "Description", "Status", "Priority"];
    const rows = tasks.map((task) => [
      task.title,
      task.description,
      task.completed ? "Completed" : "Pending",
      task.priority,
    ]);
    generateCSV(headers, rows);
  };
  const handleShare = () => {
    console.log("Tasks shared with others!");
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const draggedId = filteredTasks[source.index].id;
    const targetId = filteredTasks[destination.index].id;

    dispatch(
      reorderTasks({
        draggedId,
        targetId,
        direction: destination.index > source.index ? "down" : "up",
      })
    );
  };

  const toggleTaskStatus = (task) => dispatch(toggleComplete(task.id));
  const handleUpdate = (task, editTitle, editDescription) =>
    dispatch(
      updateTask({
        id: task.id,
        title: editTitle,
        description: editDescription,
      })
    );
  const handleDelete = (task) => dispatch(deleteTask(task.id));

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "active" && !task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardContainer>
      <HeaderSection elevation={3}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          gutterBottom
        >
          Task Tracker
        </Typography>
        <Typography variant={isMobile ? "body1" : "subtitle1"}>
          Organize and track your tasks efficiently
        </Typography>
      </HeaderSection>
      <TaskCompletionStats tasks={filteredTasks} />
      <ContentRow>
        <LeftColumn>
          <SectionPaper elevation={1}>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={handleDialogOpen}
              sx={{ marginTop: theme.spacing(3) }}
            >
              Add New Task
            </StyledButton>
            <Typography variant="h6" gutterBottom>
              Search Tasks
            </Typography>
            <SearchBar onSearch={handleSearchChange} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ marginTop: theme.spacing(3) }}
            >
              Filter Tasks
            </Typography>
            <FilterControls onFilter={handleFilterChange} filter={filter} />
          </SectionPaper>
        </LeftColumn>

        <RightColumn>
          <TaskListContainer>
            <SectionPaper elevation={1}>
              <Typography variant="h6" gutterBottom>
                Your Tasks
              </Typography>
              <TaskList
                onImport={handleImport}
                onShare={handleShare}
                onExport={handleExport}
                tasks={filteredTasks}
                onDrag={handleDragEnd}
                toggleTaskStatus={toggleTaskStatus}
                onDelete={handleDelete}
                onEdit={handleUpdate}
              />
            </SectionPaper>
          </TaskListContainer>
        </RightColumn>
      </ContentRow>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <AddTaskForm closeDialog={handleDialogClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default TaskDashboard;
