import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AddTaskForm } from "./features/tasks/AddTaskForm";
import { TaskList } from "./features/tasks/TasksList";
import { TaskFilters } from "./components/FilterComponent";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="task-tracker-app">
        <h1>Task Tracker</h1>
        <AddTaskForm />
        <TaskFilters />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
