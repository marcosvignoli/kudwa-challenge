import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Period = "monthly" | "quarterly" | "yearly";

interface AppState {
  period: Period;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  period: "monthly",
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<Period>) => {
      state.period = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setPeriod, setLoading, setError, clearError } = appSlice.actions;
export default appSlice.reducer;
