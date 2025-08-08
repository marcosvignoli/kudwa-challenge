import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loadDashboardData } from "../data";
import { Period } from "./appSlice";
import { MainDashboardData } from "@/types/data";

interface DashboardState {
  data: MainDashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for loading dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (period: Period) => {
    const data = await loadDashboardData(period);
    return data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.data = null;
      state.error = null;
    },
    setDashboardError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load dashboard data";
      });
  },
});

export const { clearDashboardData, setDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
