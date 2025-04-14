import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, IconButton } from "@mui/material";
import { TaskItem } from "./index";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExportIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import ImportExportIcon from "@mui/icons-material/FileUpload";
import {
  TaskScrollContainer,
  StyledTaskContainer,
  DragHandle,
  EmptyStatePaper,
  StyledActionContainer,
  StyledIconGroup,
} from "../styles/StyledComponents";

const TaskList = ({
  tasks,
  toggleTaskStatus,
  onDelete,
  onEdit,
  onDrag,
  onExport,
  onImport,
  onShare,
}) => {
  return (
    <>
      <StyledActionContainer>
        <StyledIconGroup>
          <IconButton color="primary" onClick={onExport}>
            <ExportIcon />
          </IconButton>
          <IconButton color="primary" onClick={onShare}>
            <ShareIcon />
          </IconButton>
          <IconButton color="primary" onClick={onImport}>
            <ImportExportIcon />
            <input type="file" accept="application/JSON" hidden />
          </IconButton>
        </StyledIconGroup>
      </StyledActionContainer>
      <DragDropContext onDragEnd={onDrag}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <TaskScrollContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
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
                        completed={task.completed}
                        style={provided.draggableProps.style}
                      >
                        <DragHandle {...provided.dragHandleProps}>
                          <DragIndicatorIcon color="action" />
                        </DragHandle>
                        <TaskItem
                          task={task}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          toggleTaskStatus={toggleTaskStatus}
                        />
                      </StyledTaskContainer>
                    )}
                  </Draggable>
                ))
              ) : (
                <EmptyStatePaper elevation={3}>
                  <Typography variant="h4">
                    No tasks found. Add a new task to get started!
                  </Typography>
                </EmptyStatePaper>
              )}
              {provided.placeholder}
            </TaskScrollContainer>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TaskList;
