import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./App.css";
import { TaskDashboard } from "./components";

function App() {
  return (
    <Provider store={store}>
      <TaskDashboard />
    </Provider>
  );
}

export default App;
