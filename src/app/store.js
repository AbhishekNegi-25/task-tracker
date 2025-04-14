import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("tasks", JSON.stringify(store.getState().tasks.tasks));
  return result;
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
