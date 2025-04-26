
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/tasks/tasks");
      if (response.data.code === 404) {
        return rejectWithValue(response.data.message); 
      }
      
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/tasks/create", taskData);

      if (response.data.code === 400) {
        return rejectWithValue(response.data.message);
      }

      return response.data; // ✅ Contains message & task
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);


export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/tasks/delete", { taskId });

      if ([400, 404, 500].includes(response.data.code)) {
        return rejectWithValue(response.data.message);
      }

      return {
        message: response.data.message,
        taskId, // ✅ Return taskId so it can be removed from state
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);



const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        
        state.tasks.tasks.push(action.payload.task);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks.tasks = state.tasks.tasks.filter(
          (task) => task._id !== action.payload.taskId
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      });
      
  },
});

export default taskSlice.reducer;
