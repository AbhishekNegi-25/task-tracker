import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  filters: {
    status: "all",
    priority: "all",
    search: "",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ title, description, priority, categories }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            priority,
            categories,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    toggleTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { addTask, toggleTask, deleteTask, updateTask, setFilter } =
  taskSlice.actions;

export const selectFilteredTasks = (state) => {
  const { tasks } = state.tasks;
  const { status, priority, search } = state.tasks.filters;

  return tasks.filter((task) => {
    const matchesStatus =
      status === "all" ||
      (status === "completed" && task.completed) ||
      (status === "active" && !task.completed);

    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });
};

export default taskSlice.reducer;
