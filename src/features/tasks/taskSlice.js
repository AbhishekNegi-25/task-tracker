import { createSlice, nanoid } from "@reduxjs/toolkit";
import { saveTasksToLocalStorage } from "../../utils/storageHelper";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  filter: "all",
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        saveTasksToLocalStorage(state.tasks);
      },
      prepare: ({ title, description, priority, categories }) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          completed: false,
          priority,
          categories: categories || [],
          createdAt: new Date().toISOString(),
        },
      }),
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);

      saveTasksToLocalStorage(state.tasks);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    reorderTasks: (state, action) => {
      const { draggedId, targetId, direction } = action.payload;
      const tasks = [...state.tasks];

      const draggedIndex = tasks.findIndex((t) => t.id === draggedId);
      const targetIndex = tasks.findIndex((t) => t.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) return;

      const [removed] = tasks.splice(draggedIndex, 1);
      const insertAt = direction === "down" ? targetIndex + 1 : targetIndex;
      tasks.splice(insertAt, 0, removed);

      state.tasks = tasks;
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  updateTask,
  setFilter,
  setSearchQuery,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
