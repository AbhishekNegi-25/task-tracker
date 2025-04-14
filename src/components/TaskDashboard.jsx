import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchBar, FilterControls, AddTaskForm, TaskList } from "./index";

const DashboardContainer = styled("div")(({ theme }) => ({
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  maxWidth: "1200px",
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const HeaderSection = styled(SectionPaper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const ContentRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const LeftColumn = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("md")]: {
    flex: "0 0 33%",
    maxWidth: "33%",
  },
}));

const RightColumn = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const TaskListContainer = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("md")]: {
    flex: "0 0 60%",
    maxWidth: "60%",
  },
}));

const TaskFormContainer = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("md")]: {
    flex: "0 0 40%",
    maxWidth: "40%",
  },
}));

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DashboardContainer>
      <HeaderSection elevation={3}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          gutterBottom
        >
          Task Manager
        </Typography>
        <Typography variant={isMobile ? "body1" : "subtitle1"}>
          Organize and track your tasks efficiently
        </Typography>
      </HeaderSection>

      <ContentRow>
        <LeftColumn>
          <SectionPaper elevation={1}>
            <Typography variant="h6" gutterBottom>
              Search Tasks
            </Typography>
            <SearchBar />
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Filter Tasks
            </Typography>
            <FilterControls />
          </SectionPaper>
        </LeftColumn>
        <RightColumn>
          <TaskListContainer>
            <SectionPaper elevation={1}>
              <Typography variant="h6" gutterBottom>
                Your Tasks
              </Typography>
              <TaskList tasks={tasks} />
            </SectionPaper>
          </TaskListContainer>

          <TaskFormContainer>
            <SectionPaper elevation={1}>
              <Typography variant="h6" gutterBottom>
                Add New Task
              </Typography>
              <AddTaskForm />
            </SectionPaper>
          </TaskFormContainer>
        </RightColumn>
      </ContentRow>
    </DashboardContainer>
  );
};

export default TaskDashboard;
