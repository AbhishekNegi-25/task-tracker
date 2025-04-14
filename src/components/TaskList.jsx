import React from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Typography } from "@mui/material";
import { TaskItem } from "./index";
import { reorderTasks } from "../features/tasks/taskSlice";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";


const StyledTaskContainer = styled("div")(
  ({ theme, isDragging, completed }) => ({
    borderLeft: `6px solid ${
      completed
        ? theme.palette.success.main
        : theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700]
    }`,
    backgroundColor: isDragging
      ? theme.palette.action.hover
      : theme.palette.background.paper,
    boxShadow: isDragging ? theme.shadows[4] : theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.8),
    display: "flex",
    alignItems: "center",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      boxShadow: theme.shadows[3],
      transform: "translateY(-2px)",
    },
  })
);

const DragHandle = styled("div")(({ theme }) => ({
  cursor: "grab",
  marginRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  "&:active": {
    cursor: "grabbing",
  },
}));

const TaskList = () => {
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

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

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

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

  if (filteredTasks.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1">
          No tasks found. Add a new task to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filteredTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <StyledTaskContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    isDragging={snapshot.isDragging}
                    style={provided.draggableProps.style}
                    completed={task.completed}
                  >
                    <DragHandle {...provided.dragHandleProps}>
                      <DragIndicatorIcon color="action" />
                    </DragHandle>
                    <TaskItem task={task} />
                  </StyledTaskContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
