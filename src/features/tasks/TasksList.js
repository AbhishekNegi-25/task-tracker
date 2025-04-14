import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredTasks } from "./taskSlice";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const tasks = useSelector(selectFilteredTasks);

  return (
    <div className="task-flex-container">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
