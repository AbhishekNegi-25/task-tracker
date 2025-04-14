import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  ChartSection,
  ChartFlexContainer,
  ChartWrapper,
  CompletionText,
} from "./StyledComponents";

const TaskCompletionStats = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const dataCompletion = [
    { name: "Completed", value: completedTasks },
    { name: "Active", value: totalTasks - completedTasks },
  ];

  const taskPriorityData = [
    {
      name: "High",
      value: tasks.filter((task) => task.priority === "High").length,
    },
    {
      name: "Medium",
      value: tasks.filter((task) => task.priority === "Medium").length,
    },
    {
      name: "Low",
      value: tasks.filter((task) => task.priority === "Low").length,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ChartSection elevation={1} py={5}>
      <ChartFlexContainer>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height={isSmallScreen ? 300 : 340}>
            <PieChart>
              <Pie
                data={dataCompletion}
                dataKey="value"
                nameKey="name"
                outerRadius={isSmallScreen ? 80 : 120}
              >
                {dataCompletion.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height={isSmallScreen ? 300 : 340}>
            <BarChart data={taskPriorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" radius={[0, 0, 2, 2]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartFlexContainer>

      <CompletionText variant="body1">
        {completedTasks} of {totalTasks} tasks completed (
        {Math.round((completedTasks / totalTasks) * 100)}%)
      </CompletionText>
    </ChartSection>
  );
};

export default TaskCompletionStats;
